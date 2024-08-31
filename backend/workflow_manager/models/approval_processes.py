import uuid
from django.db import models
from iam.role.models.models import IamRoleModel
from ..models.workflow_protocol_model import WorkFlowProtocolModel

class ApprovalStageTemplateModel(models.Model):
    """
    Represents a stage template in an approval process.
    This model represent a stage template, defining the stages that are part of a particular process.
    """
    stage_template_id = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True, editable=False)
    process = models.ForeignKey(WorkFlowProtocolModel, on_delete=models.CASCADE, related_name='stage_templates')
    stage_name = models.CharField(max_length=100) 
    role = models.ForeignKey(IamRoleModel, on_delete=models.CASCADE, related_name='role_stage_templates')
    stage_order = models.PositiveIntegerField(default=1, null=False, blank=False)  # Order of the stage in the process

    class Meta:
        ordering = ['stage_name']
        unique_together = ('process', 'stage_name')

    def __str__(self):
        return f"{self.stage_name} ({self.process.protocol_name})"