from rest_framework import views, status, generics, mixins,viewsets
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, PermissionDenied
from dmsmodule.folder.models.models import FolderModel
from dmsmodule.folder.serializers.get_folder_serializer import GetFolderSerializer
from dmsmodule.document_repository.serializer.get_serializer.get_document_serializer import DocumentSerializerModel
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from utils.custom_exception_handler import CustomExceptionForError
from ..folder_authorization_policy.folder_view_policies import FolderViewAccessPolicy


class GetFolderRequestHandler(mixins.ListModelMixin, generics.GenericAPIView):
    permission_classes = [FolderViewAccessPolicy]
    serializer_class = GetFolderSerializer
    queryset = FolderModel.objects.all()  # Base queryset

    def get(self, request, folder_identifier=None, format=None):
        try:
            if folder_identifier:
                folder = self.get_object(folder_identifier)
                serializer = self.serializer_class(folder, context={'request': request})
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                top_level_folders = self.get_top_level_folders()
                serializer = self.serializer_class(top_level_folders, many=True, context={'request': request})
                return Response(serializer.data, status=status.HTTP_200_OK)
        except CustomExceptionForError as exc:
            return Response({
                "message": exc.message,
                "error_type": exc.error_type,
                "status_code": exc.status_code
            })
        

    def get_queryset(self):
        # if i have multiple permission in permission_class 
        for permission in self.permission_classes: 
            if hasattr(permission, 'scope_queryset'):
                queryset = permission.scope_queryset(self.request, self.queryset)
        return queryset
    

    def get_object(self, folder_identifier):
        try:
            folder = self.get_queryset().get(folder_identifier=folder_identifier)
            return folder
        except FolderModel.DoesNotExist:
            raise NotFound(detail="Folder not found.")

    def get_top_level_folders(self):
        top_level_folders = self.get_queryset().filter(parent_folder__isnull=True)
        if not top_level_folders.exists():
            raise CustomExceptionForError(message="No folder found associated with this account", error_type="NO_FOUND", status_code=450)
        return top_level_folders
        






class GetOwnerFolderRequestHandler(generics.ListAPIView):
    permission_classes = [FolderViewAccessPolicy]
    serializer_class = GetFolderSerializer
    queryset = FolderModel.objects.all()  # Start with all folders

    def get_queryset(self):
        # Use the scope_queryset method from your policy to filter the folders
        return self.permission_classes[0].scope_queryset(self.request, self.queryset)
    



class FolderListView(generics.ListAPIView):
    permission_classes = [FolderViewAccessPolicy]
    serializer_class = GetFolderSerializer
    queryset = FolderModel.objects.all()


