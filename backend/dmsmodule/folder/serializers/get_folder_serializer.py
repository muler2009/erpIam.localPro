from rest_framework import serializers
from dmsmodule.folder.models.models import FolderModel
from dmsmodule.file_mangement.serializers.get_document_serializer import GetDocumentSerializer

class GetFolderSerializer(serializers.ModelSerializer):
    subfolder = serializers.SerializerMethodField()
    parent_folder = serializers.SerializerMethodField()
    # uploaded_file = serializers.SerializerMethodField()

    class Meta:
        model = FolderModel
        fields = ['folder_identifier', 'folder_name', 'parent_folder', 'subfolder', 'folder_created_date', 'folder_updated_date']
        extra_kwargs = {
            'folder_identifier': {'read_only': True},
        } 
    
    # This method display the parent folder name instead of folder_isentifier.
    def get_parent_folder(self, object):
        if object.parent_folder:
            return object.parent_folder.folder_name
        return None

    # This method retrieves all subfolders of the current folder.
    # It serializes each subfolder using the same FolderSerializer and returns the serialized data.
    def get_subfolder(self, obj):
        subfolder = obj.subfolder.all()
        return GetFolderSerializer(subfolder, many=True, context=self.context).data
    
    # def get_uploaded_file(self, obj):
    #     uploaded_file = obj.documents.all()
    #     print(f"Folder: {obj.folder_name}, Documents: {uploaded_file}") 
    #     return GetDocumentSerializer(uploaded_file, many=True, context=self.context).data