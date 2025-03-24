import uuid
from django.db import models
from .approval_step_approver import ApprovalStepApprovers
from .workflow_transition_model import WorkflowProcessTransitionModel 



"""
    A Model for store ApprovalStage
"""

class ApprovalStageModel(models.Model):
    step_id = models.UUIDField(db_index=True, default=uuid.uuid4, primary_key=True, editable=False, help_text="attribute to identify each step")
    process = models.ForeignKey("ApprovalProcessModel", on_delete=models.CASCADE, related_name="approval_steps", help_text="Approval process to which this stage belongs")
    template = models.ForeignKey(  # New field to link step to a template
        "ApprovalTemplateModel",
        on_delete=models.CASCADE, 
        related_name="approval_steps",
        null=True, blank=True,
        help_text="Template used to create this approval step"
    )
    entryCriteria = models.ForeignKey('ApprovalEntryCriteriaModel', on_delete=models.CASCADE, null=True, blank=True, help_text="Conditions for a record to enter this stage")
    request = models.ForeignKey("SubmittedRequestForApprovalModel", on_delete=models.CASCADE, related_name="request", null=True, blank=True, help_text="Role responsible for approving this stage." )
    approval_stage_approvers = models.ForeignKey(ApprovalStepApprovers, on_delete=models.CASCADE, null=True, blank=True, related_name="stage_approvers")
    approval_transition = models.ForeignKey(WorkflowProcessTransitionModel, on_delete=models.CASCADE, related_name="approval_transitions", null=True, blank=True)
    allow_delegate = models.BooleanField(default=False, help_text="Whether to allow delegated approvers for this stage.")
    stage_name = models.CharField(max_length=100, help_text="Approval Step Name")
    stage_order = models.PositiveIntegerField(default=1, help_text="Sequence number of this stage in the process.")
    description = models.TextField(null=True, blank=True, help_text="Description of this approval stage.")

    def __str__(self):
        return f"{self.request.request_title} - {self.stage_name} (Order: {self.stage_order})"
    
    class Meta:
        ordering = ["request"]
        db_table = "ApprovalStageTable"