from rest_framework import serializers
from workflow_manager.models.request_model import RequestInWorkFlowModel
from iam.models import UserAccountsModel
from workflow_manager.models.workflow_state_model import WorkFlowStateModel
from workflow_manager.models.workflow_protocol_model import WorkFlowProtocolModel

class RequestSendSerializer(serializers.ModelSerializer):
    requesting_user = serializers.SerializerMethodField()
    request_assigned_to_user = serializers.SerializerMethodField()
    current_state = serializers.SerializerMethodField()
    request_type = serializers.SerializerMethodField()
    
    def get_requesting_user(self, obj):
        return obj.requesting_user.username
    
    def get_request_assigned_to_user(self, obj):
        return obj.request_assigned_to_user.username if obj.request_assigned_to_user else None

    def get_current_state(self, obj):
        return obj.current_state.state_name
    
    def get_request_type(self, obj):
        return obj.request_type.protocol_name if obj.request_type else None
    
    def to_internal_value(self, data):
        # Override this method to convert name to ID
        if 'request_type' in data:
            try:
                data['request_type'] = WorkFlowProtocolModel.objects.get(protocol_name=data['request_type']).pk
            except WorkFlowProtocolModel.DoesNotExist:
                raise serializers.ValidationError({"request_type_name": "Invalid request type name"})
        return super().to_internal_value(data)
    

    class Meta:
        model = RequestInWorkFlowModel
        fields = ['title', 'requesting_user', 'request_assigned_to_user', 'current_state', 'request_type', 'request_sent_at', 'request_updated_at']
        extra_kwargs = {
            'request_id': {'read_only': True},
            'request_sent_at': {'read_only': True},
            'request_updated_at': {'read_only': True}
        }

    def create(self, validated_data):
        request_type = validated_data.pop('request_type', None)
        if request_type:
            validated_data['request_type'] = WorkFlowProtocolModel.objects.get(protocol_name=request_type)
        return super().create(validated_data)

