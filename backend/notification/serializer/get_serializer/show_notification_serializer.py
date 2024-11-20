from rest_framework import serializers
from ...models.core_notification_model import NotificationModel
from iam.users.serializers.get_user_account_serializer import GetUserAccountSerializer


class ShowNotificationSerializer(serializers.ModelSerializer):
    # notification_message = serializers.CharField(source='notification_template.notification_message')
    # notification_message = serializers.SerializerMethodField()
    subject =  serializers.CharField(source='notification_template.subject')
    notification_sender = serializers.SerializerMethodField()
    full_name = serializers.SerializerMethodField()

    # final_message = serializers.SerializerMethodField()

    # def get_final_message(self, obj):
    #     # Return the custom message or fall back to the formatted template message
    #     return obj.notification_message or obj.notification_metadata.get("message")

    def get_full_name(self, obj):
        return f"{obj.notification_recepient.first_name} {obj.notification_recepient.last_name}"
    
    def get_notification_sender(self, obj):
        return f"{obj.notification_sender.first_name} {obj.notification_sender.last_name}"
    
    class Meta:
        model = NotificationModel
        fields = [
            'notification_id',
            'full_name',
            # 'final_message',
            'subject',
            'notification_message',
            'notification_recepient', 
            'notification_read', 
            'notification_received_at',
            'notification_metadata',
            'notification_sender',
        ]
        
      