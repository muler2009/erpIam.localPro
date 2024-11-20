import uuid
from django.db import models


class NotificationEventTypeModel(models.Model):
    CHANNEL_CHOICES = [
        ('email', 'Email'),
        ('sms', 'SMS'),
        ('push', 'Push Notification'),
        ('in_app', 'In-App Notification'),
    ]

    eventType_id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False, unique=True)
    eventType_name = models.CharField(max_length=100, unique=True)
    default_channel = models.CharField(max_length=10, choices=CHANNEL_CHOICES, default='in_app')
    subject = models.CharField(max_length=255, blank=True, null=True)
    default_message = models.TextField()

    def __str__(self):
        return f"{self.default_channel}" 
    