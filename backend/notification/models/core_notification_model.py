from typing import Iterable
import uuid
from django.db import models
from iam.models import UserAccountsModel

# Core Notification Model Service
class NotificationModel(models.Model):

    class WORKFLOW_NOTIFICATION_TYPE(models.TextChoices):
        EMAIL = "email", 'email'
        SMS = 'sms', 'sms'
        IN_APP = "In_app", "In_app"

    class WORKFLOW_NOTIFICATION_PRIORITY(models.TextChoices):
        LOW= "low", 'low'
        MEDIUM = 'medium', 'medium'
        HIGHT = "high", "high"

    notification_id = models.UUIDField(db_index=True, default=uuid.uuid4, primary_key=True, editable=False, unique=True)
    notification_recepient = models.ForeignKey(UserAccountsModel, on_delete=models.CASCADE, related_name='notification', null=True, blank=True)
    notification_message = models.TextField()
    notification_read = models.BooleanField(default=False)
    notification_type = models.CharField(max_length=50, choices=WORKFLOW_NOTIFICATION_TYPE.choices, default=WORKFLOW_NOTIFICATION_TYPE.IN_APP) # notification type
    notification_priority = models.CharField(max_length=10, choices=WORKFLOW_NOTIFICATION_PRIORITY.choices, default=WORKFLOW_NOTIFICATION_PRIORITY.LOW)
    notification_received_at = models.DateTimeField(auto_now_add=True)
    notification_status = models.CharField(max_length=100, null=True, blank=True)
    notification_metadata = models.JSONField(null=True, blank=True)
    
    
    class Meta:
        ordering = ['notification_recepient']
        db_table = 'Notifications'
        app_label = "notification"

    def __str__(self) -> str:
        return f"{self.notification_id}"
    
    def save(self, using='erp_db', *args, **kwargs):
        if self.notification_read is None:
            self.notification_read = False
        super().save(*args, **kwargs)

