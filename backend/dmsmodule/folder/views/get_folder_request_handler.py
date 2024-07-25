from rest_framework import views, status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from dmsmodule.folder.models.models import FolderModel
from dmsmodule.folder.serializers.get_folder_serializer import GetFolderSerializer
from django.shortcuts import get_object_or_404

class GetFolderRequestHandler(views.APIView):
    def get(self, request, folder_identifier=None, format=None):
        try:
            if folder_identifier:
                folder = get_object_or_404(FolderModel, folder_identifier=folder_identifier)
                serializer = GetFolderSerializer(folder, context={'request': request})
                return Response(serializer.data)
            else:
                top_level_folders = FolderModel.objects.filter(parent_folder__isnull=True)
                if not top_level_folders:
                    raise NotFound(detail="No Folder Found")
                serializer = GetFolderSerializer(top_level_folders, many=True, context={'request': request})
                return Response(serializer.data)
        except NotFound as exc:
            return Response({"Error": exc.detail}, status=status.HTTP_404_NOT_FOUND)           
      