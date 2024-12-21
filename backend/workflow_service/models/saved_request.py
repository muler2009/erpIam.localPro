import uuid
from django.db import models
from .request_model import ApprovalRequestModel
from .workflow_state_model import WorkflowStateModel
from iam.models import UserAccountsModel

class SavedRequestModel(ApprovalRequestModel):
    request_send_by = models.ForeignKey(UserAccountsModel, on_delete=models.CASCADE, null=True, blank=True, related_name="request_initiator")
    saved_request_status = models.ForeignKey(WorkflowStateModel, on_delete=models.CASCADE, related_name="saved_state", null=True, blank=True)
    approval_process = models.ForeignKey('ApprovalProcessModel', on_delete=models.CASCADE, blank=True, null=True )
    
    class Meta:
        ordering = ["request_title"]
        verbose_name = "SavedRequest"
        db_table = "SavedRequest"

    def __str__(self):
        return f"{self.request_title}"
    
    @classmethod
    def get_default_state(cls):
        return WorkflowStateModel.objects.filter(state_name='saved').first()
        
    def save(self, using='erp_db', *args, **kwargs) -> None:
        if self.saved_request_status is None:
            default_state = self.get_default_state()
            if default_state is None:
                raise ValueError("Default approval state 'Saved' not found in the database.")
            self.saved_request_status = default_state
        super().save(*args, **kwargs)
