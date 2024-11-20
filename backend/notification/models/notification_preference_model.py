import uuid
from django.db import models
from iam.models import UserAccountsModel
from .notification_event_type import NotificationEventTypeModel


class NotificationPreferenceModel(models.Model):
    preference_id = models.UUIDField(db_index=True, default=uuid.uuid4, primary_key=True, editable=False, unique=True)
    user = models.ForeignKey(UserAccountsModel, on_delete=models.CASCADE)
    template = models.ForeignKey(NotificationEventTypeModel, on_delete=models.CASCADE, related_name='preferences', null=True)
    preffered_channel = models.CharField(max_length=50, choices=NotificationEventTypeModel.CHANNEL_CHOICES, default='in_app')
    enabled = models.BooleanField(default=True)

    class Meta:
        unique_together = ('user', 'template')
        db_table="NotificationPreferenceModel"

    def __str__(self):
        return f"Preference for {self.user} - {self.template.eventType_name} ({self.preffered_channel})"
