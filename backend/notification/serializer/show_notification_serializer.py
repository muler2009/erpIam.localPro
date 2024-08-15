from rest_framework import serializers
from ..models.workflow_notification import WorkFlowNotification


class ShowNotificationSerializer(serializers.ModelSerializer):
    notification_recepient = serializers.SerializerMethodField()

    def get_notification_recepient(self, object):
        return object.notification_recepient.username



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
            'notification_id': { 'read_only': True }
        }
