import uuid
from django.db import models


class OromiaLandPolicy(models.Model):
    policy_ormomia_id = models.UUIDField(default=uuid.uuid4, db_index=True, primary_key=True, editable=False)
    policy_name = models.CharField(max_length=255, null=True, blank=True)
    policy_description = models.TextField(null=True, blank=True)
    policy_version = models.CharField(max_length=100)
    statements = models.JSONField()
    is_app_level = models.BooleanField(default=False)
    is_model_level = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.policy_name}"
    
    class Meta:
        db_table = "OromiaLandPolicy"