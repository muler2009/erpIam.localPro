from rest_framework import serializers
from ...models.document import DocumentModel
from .get_doc_version_serializer import DocumentVersionSerializer

class DocumentSerializerModel(serializers.ModelSerializer):
    current_version = DocumentVersionSerializer()
    folder = serializers.SerializerMethodField()
    # file_url = serializers.SerializerMethodField()

    def get_folder(self, obj):
        return obj.folder.folder_name if obj.folder else None
    
    class Meta:
        model = DocumentModel
        fields = [
            'document_information_id',
            'document_name',
            'folder',
            'created_by',
            'created_at',
            'current_version',
                # Use current version related field
        ]