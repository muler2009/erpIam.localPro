from rest_framework import serializers
from ...models.notification_template import NotificationTemplateModel

class CreateNotificationTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificationTemplateModel
        fields = [  
            'template_name', 
            'template_channel', 
            'subject', 
            'notification_message', 
        ]

        extra_kwargs = {
            'template_id': {'read_only': True}
        }

    def validate(self, data):
        """
        Custom validation for empty values and data types.
        """
        errors = {}

        # Check for empty 'policy_name' field
        if not data.get('template_name'):
            errors['template_name'] = "Template name is a required field."

        # Check for empty 'policy_description' field
        if not data.get('template_channel'):
            errors['template_channel'] = "Channel a required field."

        # Check for empty 'policy_description' field
        if not data.get('notification_message'):
            errors['notification_message'] = "Message a required field."

        if errors:
            raise serializers.ValidationError(errors)

        return data
    
    
    def create(self, validated_data):
        # template_instance = NotificationTemplateModel.objects.create(validated_data)
        return super().create(validated_data)