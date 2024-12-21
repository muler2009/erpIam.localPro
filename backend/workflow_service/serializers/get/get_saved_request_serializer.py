from rest_framework import serializers
from ...models.saved_request import SavedRequestModel


class GetSavedRequestSerialzier(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()
    file_name = serializers.SerializerMethodField()
    approval_process = serializers.SerializerMethodField()
    status = serializers.CharField(source='saved_request_status.state_name')
    request_send_by = serializers.SerializerMethodField(method_name="get_sender")

    def get_approval_process(self, obj):
        return obj.approval_process.process_name if obj.approval_process else None
        
    def get_request_send_by(self, obj):
        return obj.request_send_by.username if obj.request_send_by else None

    def get_file_url(self, obj):
        request = self.context.get('request')
        if request and obj.file_for_approval and hasattr(obj.file_for_approval.uploaded_file, 'url'):
            return request.build_absolute_uri(obj.file_for_approval.uploaded_file.url)
        return None

    def get_file_name(self, obj):
        if obj.file_for_approval:
            return obj.file_for_approval.document.document_name if obj.file_for_approval.uploaded_file else None
        return None
    
    def get_saved_request_status(self, obj):  # Corrected the method parameter name
        return obj.saved_request_status.state_name
        
    def get_sender(self, obj):
        return f"{obj.request_send_by.first_name} {obj.request_send_by.last_name}"

    
    class Meta:
        model = SavedRequestModel
        fields = [
            'request_id',
            'request_title', 
            'request_sent_at', 
            'request_updated_at', 
            'request_send_by', 
            'approval_process', 
            'status',
            'file_url',
            'file_name'
        ]
       