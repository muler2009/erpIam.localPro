from rest_framework import serializers
from ...models.notification_preference_model import NotificationPreferenceModel
from ...models.notification_event_type import NotificationEventTypeModel


class SetUpPreferenceSerializer(serializers.ModelSerializer):
    template = serializers.SlugRelatedField(
        queryset=NotificationEventTypeModel.objects.all(),
        slug_field='eventType_name'  # Reference the 'name' field for lookups
    )
    
    class Meta:
        model = NotificationPreferenceModel
        fields = [
            'user', 
            'template', 
            'enabled',
            'preffered_channel' 
        ]

        extra_kwargs = {
            'user': {'read_only': True},  # Make user read-only
            'preference_id': { 'read_only': True }
        }

    def validate(self, data):
        errors = {}
        # Check for empty 'policy_name' field
        if not data.get('template'):
            errors['template'] = "template is a required field."
        if not data.get('preffered_channel'):
            errors['preffered_channel'] = "preffered_channel is a required field."

        if errors:
            raise serializers.ValidationError(errors)

        return data
    
    def create(self, validated_data):
        user_instance = self.context['request'].user
        preference = NotificationPreferenceModel.objects.create(user=user_instance, **validated_data)
        return preference
