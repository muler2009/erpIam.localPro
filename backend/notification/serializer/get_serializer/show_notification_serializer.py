from rest_framework import serializers
from ...models.core_notification_model import NotificationModel


class ShowNotificationSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    def get_full_name (self, obj):
        return f"{obj.notification_recepient.first_name} {obj.notification_recepient.last_name}"
    
    
    

    class Meta:
        model = NotificationModel
        fields = [
            'notification_id',
            'full_name',
            'notification_recepient', 
            'notification_message', 
            'notification_read', 
            'notification_type', 
            'notification_priority', 
            'notification_received_at',
            'notification_status',
            'notification_metadata',
            'notification_sender'
        ]
        
      