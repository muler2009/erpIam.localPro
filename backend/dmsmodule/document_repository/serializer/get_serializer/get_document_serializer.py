from rest_framework import serializers
from ...models.document import DocumentModel
from .get_doc_version_serializer import DocumentVersionSerializer

class DocumentSerializerModel(serializers.ModelSerializer):
    current_version = DocumentVersionSerializer()
    folder = serializers.SerializerMethodField()
    file_size = serializers.SerializerMethodField()

    def get_file_size(self, obj):
        if obj.current_version:
            size_in_bytes = obj.current_version.uploaded_file.size
            return self.human_readable_file_size(size_in_bytes)
        return None

    def human_readable_file_size(self, size):
        """
        Converts file size in bytes to a human-readable format (B, KB, MB, or GB).
        """
        if size < 1024:
            return f"{size}B"
        elif size < 1024 ** 2:
            return f"{size / 1024:.2f}KB"
        elif size < 1024 ** 3:
            return f"{size / (1024 ** 2):.2f}MB"
        else:
            return f"{size / (1024 ** 3):.2f}GB"
        
        

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
            'file_size'
                # Use current version related field
        ]

