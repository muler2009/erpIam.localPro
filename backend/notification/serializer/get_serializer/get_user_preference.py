from rest_framework import serializers
from ...models.notification_preference_model import NotificationPreferenceModel


class NotificationPreferenceSerialzier(serializers.ModelSerializer):
      template = serializers.CharField(source='template.eventType_name')
      class Meta:
        model = NotificationPreferenceModel
        fields = [  
            'template', 
            'enabled', 
            'preffered_channel' 
        ]
           