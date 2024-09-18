from rest_framework import serializers
from ..models.document_information import DocumentInformation
from .get_document_serializer import GetDocumentSerializer
from .document_version_serialzier import DocumentVersionSerializer


class DocumentInformationSerializer(serializers.ModelSerializer):
    versions = DocumentVersionSerializer(many=True, read_only=True)
    current_version = GetDocumentSerializer(read_only=True)
   
    class Meta:
        model = DocumentInformation
        fields = [
            'document_information_id',
            'document_name',
            'current_version',
            'created_at',
            'versions',
            'created_by',
        ]

        extra_kwargs = {
            'created_at': {'read_only': True}
        }



class CreateDocumentInformationSerializer(serializers.ModelSerializer):
    created_by = serializers.SerializerMethodField()

    def get_created_by(self, object):
        return object.created_by.username if object.created_by.username else None
    
    class Meta:
        model = DocumentInformation
        fields = [
            'document_information_id',
            'document_name',
            'current_version',
            'created_by',
            'created_at',
          
        ]

    def create(self, validated_data):
        # Set the 'created_by' field to the requesting user (from context)
        created_by = self.context['request'].user
        return DocumentInformation.objects.create(created_by=created_by, **validated_data)

   