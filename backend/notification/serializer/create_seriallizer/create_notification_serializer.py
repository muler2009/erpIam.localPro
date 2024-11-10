from rest_framework import serializers
from notification.models.core_notification_model import NotificationModel


class CreateNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificationModel
        fields = [
            'notification_recepient', 
            'notification_message', 
            'notification_read', 
            'notification_type', 
            'notification_priority', 
            'notification_sent_at',
            'notification_status',
            'notification_metadata',
            'notification_sender'   
        ]

        extra_kwargs = {
            'notification_id': { 'read_onnly': True },
            'notification_sent_at':  { 'read_onnly': True }
        }

    def create(self, validated_data):
        notification_sender = self.context['request'].user
        notifcations = NotificationModel.objects.create(notification_sender=notification_sender, **validated_data)
        return notifcations
    
    
    
class UpdateNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificationModel
        fields = [
            'notification_recepient', 
            'notification_message', 
            'notification_read', 
            'notification_type', 
            'notification_priority', 
            'notification_received_at',
            'notification_status',
            'notification_metadata'   
        ]

        extra_kwargs = {
            'notification_id': { 'read_only': True },
            'notification_received_at':  { 'read_only': True }
        }
    
    def update(self, instance, validated_data):
        instance.notification_read = validated_data.get('notification_read', instance.notification_read)
        instance.save()
        return instance