import uuid
from django.db import models

class PolicyAction(models.Model):
    action_id = models.UUIDField(db_index=True, default=uuid.uuid4, primary_key=True, editable=False, unique=True)
    policy_action_name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.policy_action_name}"

    class Meta:
       db_table = 'ActionModel'
       app_label = 'iam_policy'
