from rest_framework import serializers
from ...models.request_model import ApprovalRequestModel
from ...models.saved_request import SavedRequestModel
from ...models.approval_process import ApprovalProcessModel
from ...serializers.create.request_model_serializer import RequestModelSerializer

class SaveRequestSerializer(RequestModelSerializer):
    approval_process = serializers.SerializerMethodField()
    saved_request_status = serializers.SerializerMethodField()
    request_send_by = serializers.SerializerMethodField()
    
    class Meta(RequestModelSerializer.Meta):
        model = SavedRequestModel
        fields = RequestModelSerializer.Meta.fields + [
            'approval_process', 
            'saved_request_status',
            'request_send_by'
        ]
        extra_kwargs = {
            'request_id': {'read_only': True},
            'request_sent_at': {'read_only': True},
            'request_updated_at': {'read_only': True}
        }

    def get_approval_process(self, obj):
        return obj.approval_process.process_name if obj.approval_process else None
    
    def get_request_send_by(self, obj):
        return obj.request_send_by.username if obj.request_send_by else None
    
    def get_saved_request_status(self, obj):  # Corrected the method parameter name
        return obj.saved_request_status.state_name
    
    def to_internal_value(self, data):
        # Convert request_type from name to ID
        if 'approval_process' in data:
            try:
                data['approval_process'] = ApprovalProcessModel.objects.get(process_name=data['approval_process']).pk
            except ApprovalProcessModel.DoesNotExist:
                raise serializers.ValidationError({"request_type_name": "Invalid request type name"})
        return super().to_internal_value(data)  
    

      