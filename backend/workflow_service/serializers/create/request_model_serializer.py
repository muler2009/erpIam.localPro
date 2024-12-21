from rest_framework import serializers
from ...models.saved_request import SavedRequestModel


class RequestModelSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()
    file_name = serializers.SerializerMethodField()
    file_for_approval = serializers.FileField(required=True)
    
    class Meta:
        model = SavedRequestModel
        fields = [
            'request_title', 
            'request_sent_at', 
            'request_updated_at', 
            "file_for_approval",
            'file_url',
            'file_name'
        ]
        extra_kwargs = {
            'request_id': {'read_only': True},
            'request_sent_at': {'read_only': True},
            'request_updated_at': {'read_only': True}
        }

    def get_file_url(self, obj):
        request = self.context.get('request')
        if request and obj.file_for_approval and hasattr(obj.file_for_approval.uploaded_file, 'url'):
            return request.build_absolute_uri(obj.file_for_approval.uploaded_file.url)
        return None

    def get_file_name(self, obj):
        if obj.file_for_approval:
            return obj.file_for_approval.document.document_name if obj.file_for_approval.uploaded_file else None
        return None
    
    