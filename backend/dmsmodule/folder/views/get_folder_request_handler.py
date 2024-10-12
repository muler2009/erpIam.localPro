from rest_framework import views, status, generics, mixins,viewsets
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, PermissionDenied
from dmsmodule.folder.models.models import FolderModel
from dmsmodule.folder.serializers.get_folder_serializer import GetFolderSerializer
from dmsmodule.document_repository.serializer.get_serializer.get_document_serializer import DocumentSerializerModel
from ..access_policies import StaffOnlyAccessPolicy, FolderViewAccessPolicy
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from utils.custom_exception_handler import CustomExceptionForError

# class GetFolderRequestHandler(mixins.ListModelMixin, generics.GenericAPIView):
#     permission_classes = [FolderViewAccessPolicy]
#     serializer_class = GetFolderSerializer
#     queryset = FolderModel.objects.all()
    
#     def get_queryset(self):
#         # Use the scope_queryset method from your policy to filter the folders
#         return self.permission_classes[0].scope_queryset(self.request, self.queryset)

#     def get(self, request, folder_identifier=None, format=None):
#         """
#         Handles GET requests to retrieve folder data based on the folder identifier.
#         """
#         try:
#             folder_data = self.get_object(folder_identifier=folder_identifier, request=request)
#             return Response(folder_data, status=status.HTTP_200_OK)
#         except NotFound as exc:
#             raise exc  # Let the custom exception handler deal with it
#         except PermissionDenied as exc:
#             return Response({"message": exc.detail, "error_type": exc.default_detail}, status=status.HTTP_403_FORBIDDEN) # Let the custom exception handler deal with it
    
#     def get_object(self, folder_identifier, request):
#         """
#         Retrieves folder data based on the folder identifier. If no identifier is provided,
#         retrieves all top-level folders.
#         """
#         if folder_identifier:   
#             # Attempt to get a specific folder
            
#             folder = self.get_queryset().get(folder_identifier=folder_identifier)
#             serializer = self.serializer_class(folder, context={'request': request})
#             return serializer.data  # Return serialized folder data
#         else:
#             # Get all top-level folders
#             top_level_folders = FolderModel.objects.filter(parent_folder__isnull=True)
#             if not top_level_folders.exists():
#                 raise NotFound(detail="No folders found.")  # Raise an error if none exist
#             serializer = self.serializer_class(top_level_folders, many=True, context={'request': request})
#             return serializer.data  # Return serialized top-level folder data


class GetFolderRequestHandler(mixins.ListModelMixin, generics.GenericAPIView):
    permission_classes = [FolderViewAccessPolicy]
    serializer_class = GetFolderSerializer
    queryset = FolderModel.objects.all()  # Base queryset

    def get_queryset(self):
        # Filter the queryset based on the user's permissions
        return self.permission_classes[0].scope_queryset(self.request, self.queryset)

    def get(self, request, folder_identifier=None, format=None):
        """
        Handles GET requests to retrieve folder data based on the folder identifier.
        If no identifier is provided, retrieves all top-level folders.
        """
        try :
            if folder_identifier:
                # Retrieve a specific folder
                folder = self.get_object(folder_identifier)
                serializer = self.serializer_class(folder, context={'request': request})
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                # Retrieve all top-level folders
                top_level_folders = self.get_top_level_folders()
                serializer = self.serializer_class(top_level_folders, many=True, context={'request': request})
                return Response(serializer.data, status=status.HTTP_200_OK)
        except CustomExceptionForError as exc:
            return Response({
                "message": exc.message,
                "error_type": exc.error_type,
                "status_code": exc.status_code
            })

    def get_object(self, folder_identifier):
        """
        Retrieves the folder object based on the folder identifier.
        Raises NotFound if the folder does not exist.
        """
        try:
            # Use the scope to filter for the specific folder that the user has access to
            folder = self.get_queryset().get(folder_identifier=folder_identifier)
            return folder
        except FolderModel.DoesNotExist:
            raise NotFound(detail="Folder not found.")  # Custom message for not found

    def get_top_level_folders(self):
        """
        Retrieves all top-level folders (i.e., folders without a parent).
        If none are found, raises NotFound.
        """
        top_level_folders = self.get_queryset().filter(parent_folder__isnull=True)  # Only get top-level folders
        if not top_level_folders.exists():
            raise CustomExceptionForError(message="Empty Folder", error_type="NO_FOLDER_FOUND", status_code=450)  # Custom message if none exist
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


