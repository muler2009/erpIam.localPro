import uuid
from django.db import models


class OromiaLandPolicy(models.Model):
    policy_ormomia_id = models.UUIDField(default=uuid.uuid4, db_index=True, primary_key=True, editable=False)
    policy_name = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    version = models.CharField(max_length=100)
    statements_modifed = models.JSONField()


    def __str__(self):
        return f"{self.policy_name}"