import uuid
from django.db import models
from iam.role.models.models import IamRoleModel
from .workflow_action_model import WorkflowActionModel
from .approval_type_model import ApprovalProcessTypeModel
from .approval_step_approver import ApprovalStepApprovers

class ApprovalStepModel(models.Model):
    step_id = models.UUIDField(db_index=True, default=uuid.uuid4, primary_key=True, editable=False, help_text="attribute to identify each step")
    process = models.ForeignKey("ApprovalProcessModel", on_delete=models.CASCADE, related_name="approval_steps", help_text="Approval process to which this stage belongs.")
    allow_delegate = models.BooleanField(default=False, help_text="Whether to allow delegated approvers for this stage.")
    stage_name = models.CharField(max_length=100, help_text="Name of the approval stage.")
    assigned_approver = models.ForeignKey(ApprovalStepApprovers, on_delete=models.CASCADE, related_name="assigned_approver", null=True, blank=True, help_text="Role responsible for approving this stage." )
    stage_order = models.PositiveIntegerField(default=1, help_text="Sequence number of this stage in the process.")
    entryCriteria = models.JSONField(null=True, blank=True, help_text="Conditions for a record to enter this stage." )
   
    # approval_action = models.ForeignKey(WorkflowActionModel, on_delete=models.SET_NULL, null=True, blank=True, related_name="approval_stage_actions", help_text="Action to perform when this stage is approved.")
    # rejection_action = models.ForeignKey(WorkflowActionModel, on_delete=models.SET_NULL, null=True, blank=True, related_name="rejection_stage_actions", help_text="Action to perform when this stage is rejected.")
    description = models.TextField(null=True, blank=True, help_text="Description of this approval stage.")
    # reject_behavior = models.CharField(max_length=50, null=True, blank=True, help_text="Behavior when a request is rejected during this stage.")

    def __str__(self):
        return f"{self.stage_name} (Order: {self.stage_order})"