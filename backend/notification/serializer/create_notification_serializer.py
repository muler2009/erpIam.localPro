from rest_framework import serializers
from ..models.workflow_notification import WorkFlowNotification


class CreateNotificationSeerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkFlowNotification
        fields = [
            'notification_recepient', 
            'notification_message', 
            'notification_read', 
            'notification_recieved_at', 
            'notification_metadata', 
            'workflow_state', 
            'action_taken',
            'request'
        ]
        extra_kwargs = {
            'notification_id': { 'read_onnly': True }
        }

    def create(self, validated_data):
        return super().create(validated_data)