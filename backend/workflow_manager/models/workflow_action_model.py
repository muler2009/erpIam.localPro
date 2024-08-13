from django.db import models
import uuid
from .workflow_protocol_model import WorkFlowProtocolModel


class WorkFlowActionsModel(models.Model):
    action_id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False, unique=True, db_index=True)
    action_name = models.CharField(max_length=150, null=False, blank=False)
    action_description = models.TextField(null=True, blank=True)
    action_protocol = models.ForeignKey(WorkFlowProtocolModel, on_delete=models.CASCADE, related_name='actions')


    def __str__(self):
        return f"{self.action_name}"
    
    class Meta:
        ordering = ["action_name"]
        db_table = "Actions"
        verbose_name = "Action"
        app_label = "workflow_manager"


        
