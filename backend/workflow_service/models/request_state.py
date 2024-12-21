from django.db import models
from .request_model import ApprovalRequestModel
from .submitted_request import SubmittedRequestForApprovalModel
from .approval_step_approver import ApprovalStepApprovers
from .approval_step_model import ApprovalStepModel
from .workflow_state_model import WorkflowStateModel


class RequestApprovalStateModel(models.Model):
    request = models.ForeignKey(SubmittedRequestForApprovalModel, on_delete=models.CASCADE, related_name="approval_state", help_text="The request being processed in the approval workflow.")
    current_step = models.ForeignKey(ApprovalStepModel, on_delete=models.CASCADE, related_name="approval_state_step", help_text="The current approval step for this request.")
    current_state = models.ForeignKey(WorkflowStateModel, on_delete=models.SET_NULL, null=True, blank=True, help_text="The status of the request in the approval process.")
    comments = models.TextField(blank=True, null=True)
    approvers = models.ManyToManyField(ApprovalStepApprovers, related_name="assigned_states", help_text="Approvers assigned to this step in the approval process")
    updated_at = models.DateTimeField(auto_now=True, help_text="The last time the approval status was updated.")
    created_at = models.DateTimeField(auto_now_add=True, help_text="When the approval process started.")
    stage_name = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.request} - {self.stage_name}"
    
    class Meta:
        db_table = "RequestApprovalStateTable"
        verbose_name = "RequestApprovalState"


    # action_taken = models.CharField(max_length=255, blank=True, null=True)
    # approver_user = models.ForeignKey(UserAccountsModel, on_delete=models.SET_NULL, null=True, blank=True)
    # role = models.ForeignKey(IamRoleModel, on_delete=models.SET_NULL, null=True, blank=True)

