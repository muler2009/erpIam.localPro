import uuid
from django.db import models
from .approval_type_model import ApprovalProcessTypeModel


class WorkflowActionModel(models.Model):
    action_id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False, unique=True, db_index=True)
    action_name = models.CharField(max_length=150, null=False, blank=False)
    action_description = models.TextField(null=True, blank=True)
    action_protocol = models.ForeignKey('ApprovalProcessModel', on_delete=models.CASCADE, related_name='actions')

    def __str__(self):
        return f"{self.action_name}"
    
    class Meta:
        ordering = ["action_name"]
