from rest_framework import serializers
from ...models.submitted_request import SubmittedRequestForApprovalModel
from ...serializers.create.request_model_serializer import RequestModelSerializer
from ...models.request_model import ApprovalProcessModel
from utils.custom_exception_handler import CustomExceptionForError
from ...models.saved_request import SavedRequestModel

import logging
logger = logging.getLogger(__name__)


class SubmitRequestSerializer(RequestModelSerializer):
    approval_process = serializers.SerializerMethodField()
    request_send_by = serializers.SerializerMethodField()
    status = serializers.CharField(source='request_status.state_name')

    class Meta(RequestModelSerializer.Meta):
        model = SubmittedRequestForApprovalModel
        fields = RequestModelSerializer.Meta.fields + [
            'approved_by', 
            'request_send_by',
            'approval_process', 
            'status',
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
    
    def to_internal_value(self, data):
        # Convert request_type from name to ID
        if 'approval_process' in data:
            try:
                data['approval_process'] = ApprovalProcessModel.objects.get(process_name=data['approval_process']).pk
            except ApprovalProcessModel.DoesNotExist:
                raise serializers.ValidationError({"request_type_name": "Invalid request type name"})
        return super().to_internal_value(data)  
    

      