from rest_framework import serializers
from ...models.document_version_control import DocumentVersionModel

class DocumentVersionSerializer(serializers.ModelSerializer):
    document_name = serializers.CharField(source='document.document_name', read_only=True)  # Access via foreign key

    class Meta:
        model = DocumentVersionModel
        fields = ['document_version_id', 'version_number', 'uploaded_file', 'is_current', 'uploaded_at', 'document_name']