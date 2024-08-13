from django.db import models
from .core_notification_model import NotificationModel

class WorkFlowNotification(NotificationModel):
    class WORKFLOW_NOTIFICATION_TYPE(models.TextChoices):
        pass

    class WORKFLOW_NOTIFICATION_PRIORITY(models.TextChoices):
        pass

    
    notification_type = models.CharField(max_length=50, choices=[('email', 'Email'), ('sms', 'SMS'), ('in_app', 'In-App')]) # notification type
    notification_priority = models.CharField(max_length=10, choices=[('low', 'Low'), ('medium', 'Medium'), ('high', 'High')], default='low')
    notification_sent_status = models.BooleanField(default=False)
