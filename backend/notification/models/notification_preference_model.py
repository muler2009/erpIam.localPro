import uuid
from django.db import models
from iam.models import UserAccountsModel
from .notification_template import NotificationTemplateModel


class NotificationPreferenceModel(models.Model):
    preference_id = models.UUIDField(db_index=True, default=uuid.uuid4, primary_key=True, editable=False, unique=True)
    user = models.ForeignKey(UserAccountsModel, on_delete=models.CASCADE)
    preffered_channel = models.CharField(max_length=50, choices=NotificationTemplateModel.CHANNEL_CHOICES)
    enabled = models.BooleanField(default=True)

    class Meta:
        unique_together = ('user', 'preffered_channel')

    def __str__(self):
        return f"{self.user.username} - {self.get_channel_display()}: {self.enabled}"
