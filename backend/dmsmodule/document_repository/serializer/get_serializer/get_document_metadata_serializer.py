from rest_framework import serializers
from ...models.document_metadata import DocumentMetadataModel
        

class GetDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentMetadataModel
        fields = ['metadata_id', 'key']
        read_only_fields = ['metadata_id']