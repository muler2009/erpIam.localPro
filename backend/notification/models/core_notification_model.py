from typing import Iterable
import uuid
from django.db import models
from iam.models import UserAccountsModel
from .notification_event_type import NotificationEventTypeModel

# Core Notification Model Service
class NotificationModel(models.Model):

    class WORKFLOW_NOTIFICATION_TYPE(models.TextChoices):
        EMAIL = "email", 'email'
        SMS = 'sms', 'sms'
        IN_APP = "In_app", "In_app"

    notification_id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False, unique=True)
    notification_sender = models.ForeignKey(UserAccountsModel, on_delete=models.CASCADE, related_name='sender', null=True, blank=True)
    notification_recepient = models.ForeignKey(UserAccountsModel, on_delete=models.CASCADE, related_name='notification', null=True, blank=True)
    notification_template = models.ForeignKey(NotificationEventTypeModel, on_delete=models.SET_NULL, null=True)
    notification_message = models.TextField(null=True, blank=True)
    notification_read = models.BooleanField(default=False)
    notification_received_at = models.DateTimeField(auto_now_add=True)
    notification_metadata = models.JSONField(null=True, blank=True)
    
    class Meta:
        ordering = ['notification_recepient']
        db_table = 'Notifications'
        app_label = "notification"

    def __str__(self) -> str:
        return f"{self.notification_sender.username}"
    
    def save(self, using='erp_db', *args, **kwargs):    
        if self.notification_read is None:
            self.notification_read = False
        super().save(*args, **kwargs)

