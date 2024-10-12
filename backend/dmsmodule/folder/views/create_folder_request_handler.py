from rest_framework import views, status, generics, mixins, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.request import Request
from rest_framework.response import Response
from dmsmodule.folder.models.models import FolderModel
from dmsmodule.folder.serializers.create_folder_serializer import CreateFolderSerializer
from utils.custom_exception_handler import CustomExceptionForError, AlreadyExistAPIException
from ..access_policies import FolderViewAccessPolicy


class CreateFolderRequestHandler(generics.GenericAPIView, mixins.CreateModelMixin):
    authentication_classes = [JWTAuthentication]
    permission_classes = [FolderViewAccessPolicy]
    serializer_class = CreateFolderSerializer

    def post(self, request:Request):
        folder_data = request.data
        try: 
            folder_serializer = self.serializer_class(data=folder_data, context={'request': request})
            folder_serializer.is_valid(raise_exception=True)

            if FolderModel.objects.filter(folder_name=request.data.get('folder_name')).exists():
                raise CustomExceptionForError(message="Folder already exist", error_type="Already exist", status_code=402)
            
            folder_serializer.create(folder_serializer.validated_data)
            
        
        except CustomExceptionForError as exc:
            return Response({
                'message': exc.message,  # Accessing detail for the message
                "error_type": exc.error_type,  # Accessing default_code for error type
                'status_code': exc.status_code,
            }, status=exc.status_code)  # Use the status code from the exception
        
        else:
            return Response({
                "status_code": 201,
                "status_text": "Folder Created Successfully",
                "data": folder_serializer.data
            }, status=status.HTTP_201_CREATED)
