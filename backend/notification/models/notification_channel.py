from django.db import models
from .core_notification_model import NotificationModel
from datetime import datetime

class NotificationServiceChannelModel(models.Model):
    class NOTIFICATION_CHANNEL(models.TextChoices):
        Email = "email", 'email'
        SMS = 'sms', 'sms'
        In_app = "In_app", "In_app"

    notification = models.ForeignKey(NotificationModel, on_delete=models.SET_NULL, related_name='notifications')
    status = models.CharField(max_length=20, default='pending')  # Track delivery status
    sent_at = models.DateTimeField(blank=True, null=True)


    def mark_as_sent(self):
        self.status = 'sent'
        self.sent_at = datetime.timezone.now()
        self.save()