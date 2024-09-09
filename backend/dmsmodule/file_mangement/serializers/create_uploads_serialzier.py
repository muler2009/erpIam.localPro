from rest_framework import views, serializers
from rest_framework.request import Request
from rest_framework.response import Response
from dmsmodule.file_mangement.models.document_uploads_models import DocumentVersion
from dmsmodule.file_mangement.serializers.get_document_serializer import GetDocumentSerializer


class DocumentVersionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentVersion
        fields = [
            'document_id',
            'document_name', 
            'uploaded_file', 
            'file_url',
            'version_number', 
            'uploaded_file_date', 
            'updated_file_date', 
            'folder'
        ]

    def create(self, validated_data):
        upload_document = DocumentVersion.objects.create(**validated_data)
        return upload_document