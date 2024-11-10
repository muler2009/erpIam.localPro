from rest_framework import serializers
from ...models.notification_template import NotificationTemplateModel


class NotificationTemplateSerializer(serializers.ModelSerializer):
      class Meta:
        model = NotificationTemplateModel
        fields = [  
            'template_id',
            'template_name', 
            'template_channel', 
            'subject', 
            'notification_message', 
        ]