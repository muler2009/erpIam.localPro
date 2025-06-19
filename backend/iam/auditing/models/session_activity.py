import uuid
from django.db import models
from .session_tracking_model import SessionTrackerModel

class SessionActivityModel(models.Model):
    class ActivityType(models.TextChoices):
        AUTHENTICATION = 'authentication', 'Authentication'
        ACCESS = 'access', 'Resource Access'
        ACTION = 'action', 'User Action'
        SECURITY = 'security', 'Security Event'
    
    session_activity_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    session = models.ForeignKey(SessionTrackerModel, on_delete=models.CASCADE, related_name='activities')
    activity_started_at  = models.DateTimeField(auto_now_add=True)
    activity_type = models.CharField(max_length=20, choices=ActivityType.choices)
    activity_details = models.JSONField()

    # Resource context
    endpoint = models.CharField(max_length=255, null=True, blank=True)
    resource_type = models.CharField(max_length=100, null=True, blank=True)
    resource_id = models.CharField(max_length=100, null=True, blank=True)

    # Additional context
    status_code = models.PositiveSmallIntegerField(null=True, blank=True)
    metadata = models.JSONField(default=dict, blank=True)


    class Meta:
        verbose_name_plural = "Session Activities"
        ordering = ['-activity_started_at']

    def __str__(self):
        return f"{self.session.user} - {self.activity_type} at {self.activity_started_at}"

