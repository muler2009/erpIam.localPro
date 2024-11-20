from rest_framework import serializers
from ...models.notification_event_type import NotificationEventTypeModel

class CreateNotificationTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificationEventTypeModel
        fields = [  
            'eventType_name', 
            'default_channel', 
            'subject', 
            'default_message', 
        ]

        extra_kwargs = {
            'eventType_id': {'read_only': True}
        }

    def validate(self, data):
        """
        Custom validation for empty values and data types.
        """
        errors = {}

        # Check for empty 'policy_name' field
        if not data.get('eventType_name'):
            errors['eventType_name'] = "Template name is a required field."

        # Check for empty 'policy_description' field
        if not data.get('default_message'):
            errors['default_message'] = "Message a required field."

        if errors:
            raise serializers.ValidationError(errors)

        return data
    
    
    def create(self, validated_data):
        # template_instance = NotificationTemplateModel.objects.create(validated_data)
        return super().create(validated_data)