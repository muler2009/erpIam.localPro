import uuid
from django.db import models


class NotificationTemplateModel(models.Model):
    CHANNEL_CHOICES = [
        ('email', 'Email'),
        ('sms', 'SMS'),
        ('push', 'Push Notification'),
        ('in_app', 'In-App Notification'),
    ]

    template_id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False, unique=True)
    template_name = models.CharField(max_length=100, unique=True)
    template_channel = models.CharField(max_length=10, choices=CHANNEL_CHOICES, default='in_app')
    subject = models.CharField(max_length=255, blank=True, null=True)
    notification_message = models.TextField()

    def __str__(self):
        return f"{self.template_name}"
    