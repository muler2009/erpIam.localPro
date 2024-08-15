import uuid
from django.db import models
from iam.models import UserAccountsModel


# Create your models here.

class NotificationModel(models.Model):

    notification_id = models.UUIDField(db_index=True, default=uuid.uuid4, primary_key=True, editable=False, unique=True)
    notification_recepient = models.ForeignKey(UserAccountsModel, on_delete=models.CASCADE, related_name='notification')
    notification_message = models.TextField()
    notification_read = models.BooleanField(default=False)
    notification_recieved_at = models.DateTimeField(auto_now_add=True)
    notification_metadata = models.JSONField(null=True, blank=True)
    
    class Meta:
        abstract = True

