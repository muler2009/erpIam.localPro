from axes.models import AccessBase, AccessFailureLog
from django.db import models
from django.utils.timezone import now

class AccessFailureLogModel(AccessBase):
    failure_count = models.IntegerField(default=0)  # Add custom failure count field
    failure_reason = models.CharField(max_length=100, null=True, blank=True)
    user_info = models.JSONField(null=True, blank=True) # json for storing the user data
    event = models.JSONField(null=True, blank=True)
    # context = models.JSONField(null=True, blank=True)
    # auth = models.JSONField(null=True, blank=True)
    risk = models.JSONField(null=True, blank=True)


    def increment_failure_count(self):
        self.failure_count += 1
        self.save()

    