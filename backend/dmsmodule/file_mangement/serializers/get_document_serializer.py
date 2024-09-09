from rest_framework import serializers
from dmsmodule.file_mangement.models.document_uploads_models import DocumentVersion


class GetDocumentSerializer(serializers.ModelSerializer): 
    file_url = serializers.SerializerMethodField()
   
    class Meta:
        model = DocumentVersion
        fields = [
            'document_id',
            'document_name', 
            'uploaded_file', 
            'file_url',
            'uploaded_file_date', 
            'updated_file_date', 
            'folder', 
            'version_number', 
        ]

    def get_file_url(self, obj):
        request = self.context.get('request')
        if request is None:
            return None
        if obj.uploaded_file and hasattr(obj.uploaded_file, 'url'):
            return request.build_absolute_uri(obj.uploaded_file.url)
        return None

