from rest_framework import serializers
from ...models.core_notification_model import NotificationModel


class ShowNotificationSerializer(serializers.ModelSerializer):
    notification_recepient = serializers.SerializerMethodField()

    def get_notification_recepient(self, object):
        return object.notification_recepient.username

    class Meta:
        model = NotificationModel
        fields = [
            'notification_id',
            'notification_recepient', 
            'notification_message', 
            'notification_read', 
            'notification_type', 
            'notification_priority', 
            'notification_sent_at',
            'notification_status',
            'notification_metadata'   
        ]
        
      