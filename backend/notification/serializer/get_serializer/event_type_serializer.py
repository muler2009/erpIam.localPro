from rest_framework import serializers
from ...models.notification_event_type import NotificationEventTypeModel


class NotificationTemplateSerializer(serializers.ModelSerializer):
      class Meta:
        model = NotificationEventTypeModel
        fields = [  
            'eventType_id',
            'eventType_name', 
            'default_channel', 
            'subject', 
            'default_message', 
        ]