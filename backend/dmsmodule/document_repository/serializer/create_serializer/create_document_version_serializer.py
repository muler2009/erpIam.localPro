from rest_framework import serializers
from ...models.document_version_control import DocumentVersionModel
from ...models.document import DocumentModel

class CreateDocumentVersionSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()
    file_name = serializers.SerializerMethodField()
    uploaded_by = serializers.SerializerMethodField()
    file_for_approval = serializers.FileField(write_only=True, required=False)

    class Meta:
        model = DocumentVersionModel
        fields = [ 
            'document',
            'uploaded_file', 
            'version_number', 
            'uploaded_at', 
            'file_url',
            'file_name',
            'uploaded_by',
            'file_for_approval',
        ]
        
        extra_kwargs = {
            'document_version_id': {'read_only': True},
            'uploaded_at': {'read_only': True}  # Fix typo here: it was 'updated_file_date'
        }   

    def get_uploaded_by(self, obj):
        if obj.uploaded_by:
            return obj.uploaded_by.username
        return None
    
   
    def get_file_url(self, obj):
        request = self.context.get('request')
        if obj.uploaded_file and hasattr(obj.uploaded_file, 'url'):
            return request.build_absolute_uri(obj.uploaded_file.url)
        return None
    
    def get_file_name(self, obj):
        return obj.uploaded_file.name if obj.uploaded_file else None
            
    
    def create(self, validated_data):
        file_to_approval = validated_data.pop('file_for_approval', None)
        document = validated_data.get('document')

        if not file_to_approval:
            raise serializers.ValidationError("No file provided")

        if not document:
            raise serializers.ValidationError("Document must be provided")

        # Create the DocumentVersion
        document_version = DocumentVersionModel.objects.create(
            document=document,
            uploaded_by=self.context['request'].user,
            uploaded_file=file_to_approval,
            **validated_data
        )

        return document_version
