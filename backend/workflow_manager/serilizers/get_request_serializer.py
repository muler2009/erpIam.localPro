from rest_framework import serializers
from workflow_manager.models.request_model import RequestInWorkFlowModel


class GetRequestModelSerializer(serializers.ModelSerializer):
    request_assigned_to_user = serializers.SerializerMethodField()
    class Meta:
        model = RequestInWorkFlowModel
        fields = ['request_id', 'title', 'requesting_user', 'request_assigned_to_user', 'current_state', 'request_type', 'request_sent_at']
        extra_kwargs = {
            'request_id': {'read_only': True}
        }
