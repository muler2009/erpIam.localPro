from rest_framework import views, status
from rest_framework.request import Request
from rest_framework.response import Response
from dmsmodule.folder.models import FolderModel
from dmsmodule.folder.serializers.create_folder_serializer import CreateFolderSerializer
from utils.custom_exception_handler import AlreadyExists


class CreateFolderRequestHandler(views.APIView):
    def post(self, request:Request):
        folder_data = request.data
        try: 
            folder_serializer = CreateFolderSerializer(data=folder_data)
            folder_serializer.is_valid(raise_exception=True)

            if FolderModel.objects.filter(folder_name=request.data.get('folder_name')).exists():
                raise AlreadyExists
            folder_serializer.create(folder_serializer.validated_data)

        except AlreadyExists as exc:
             return Response({
                f'group {request.data.get("folder_name")}': str(exc.default_code),
                'status_code': exc.status_code,
                'Error': exc.detail, 
            })
        else:
            return Response({
                "status_code": 201,
                "status_text": "Folder Created Successfully"
            }, status=status.HTTP_201_CREATED)
