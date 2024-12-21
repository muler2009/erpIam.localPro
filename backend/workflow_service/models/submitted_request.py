from django.db import models
from .request_model import ApprovalRequestModel
from .workflow_state_model import WorkflowStateModel
from iam.models import UserAccountsModel


class SubmittedRequestForApprovalModel(ApprovalRequestModel):
    request_send_by = models.ForeignKey(UserAccountsModel, on_delete=models.CASCADE, null=True, blank=True, related_name="request_submitter")
    approved_by = models.ForeignKey(UserAccountsModel, on_delete=models.CASCADE, null=True, blank=True, related_name="request_approver")
    request_status = models.ForeignKey(WorkflowStateModel, on_delete=models.CASCADE, related_name="submitted_request_state")
    approval_process = models.ForeignKey('ApprovalProcessModel', on_delete=models.CASCADE, blank=True, null=True )
    
    def __str__(self):
        return f"{self.request_title}"

    class Meta:
        verbose_name = "SubmittedRequest"
        db_table = "SubmittedRequestTable"

    @classmethod
    def get_default_state(cls):
        return WorkflowStateModel.objects.filter(state_name='pending for approval').first()
        
    def save(self, using='erp_db', *args, **kwargs) -> None:
        if self.request_status is None:
            default_state = self.get_default_state()
            if default_state is None:
                raise ValueError("Default approval state 'request_status' not found in the database.")
            self.request_status = default_state
        super().save(*args, **kwargs)