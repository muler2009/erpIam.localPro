from rest_framework import views, status, serializers
from rest_framework.request import Request
from rest_framework.response import Response
from dmsmodule.folder.models.models import FolderModel
from dmsmodule.folder.serializers.create_folder_serializer import CreateFolderSerializer
from utils.custom_exception_handler import AlreadyExists, AlreadyExistAPIException


class CreateFolderRequestHandler(views.APIView):
    def post(self, request:Request):
        folder_data = request.data
        try: 
            folder_serializer = CreateFolderSerializer(data=folder_data)
            folder_serializer.is_valid(raise_exception=True)

            if FolderModel.objects.filter(folder_name=request.data.get('folder_name')).exists():
                raise AlreadyExistAPIException(message="folder already exist", status_code=400)
            
            folder_serializer.create(folder_serializer.validated_data)

        except AlreadyExistAPIException as exc:
             return Response({
                "error_type": str(exc.error_type),
                'status_code': exc.status_code,
                'message': f'{request.data.get("folder_name")} {exc.message}' , 
            }, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({
                "status_code": 201,
                "status_text": "Folder Created Successfully",
                "data": folder_serializer.data
            }, status=status.HTTP_201_CREATED)
