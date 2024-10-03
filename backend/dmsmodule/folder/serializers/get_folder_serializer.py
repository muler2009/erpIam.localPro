from rest_framework import serializers
from dmsmodule.folder.models.models import FolderModel
from dmsmodule.file_mangement.serializers.get_document_serializer import GetDocumentSerializer
from dmsmodule.document_repository.serializer.get_serializer.get_document_serializer import DocumentSerializerModel

class GetFolderSerializer(serializers.ModelSerializer):
    subfolder = serializers.SerializerMethodField()
    parent_folder = serializers.SerializerMethodField()
    documents = serializers.SerializerMethodField()  # Add this field

    # uploaded_file = serializers.SerializerMethodField()

    class Meta:
        model = FolderModel
        fields = ['folder_identifier', 'folder_name', 'parent_folder', 'subfolder', 'folder_created_date', 'folder_updated_date', 'documents']
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


    def get_documents(self, obj):
        """Retrieve all documents within the current folder."""
        documents = obj.documents.all()  # Use the related name defined in the Document model
        return DocumentSerializerModel(documents, many=True, context=self.context).data
    
   