import uuid
from django.db import models
from iam.models import UserAccountsModel
from .approval_step_model import ApprovalStepModel
from .workflow_state_model import WorkflowStateModel
from dmsmodule.document_repository.models.document_version_control import DocumentVersionModel
from.approval_process import ApprovalProcessModel

class ApprovalRequestModel(models.Model):
    request_id = models.UUIDField(db_index=True, default=uuid.uuid4, editable=False, primary_key=True)
    request_title = models.CharField(max_length=150, null=False, blank=False)
    request_sent_at = models.DateTimeField(auto_now_add=True)
    request_updated_at = models.DateTimeField(auto_now=True)
    file_for_approval = models.ForeignKey(DocumentVersionModel, on_delete=models.CASCADE, blank=True)
    current_stage = models.ForeignKey(ApprovalStepModel, on_delete=models.SET_NULL, null=True, blank=True)
    

    # help_text="The current status of the request."
    # request_status = models.ForeignKey(WorkflowStateModel, on_delete=models.CASCADE, related_name='request_status', null=True, blank=True) 
   
    def __str__(self):
        return f"{self.request_title}"
    
    class Meta:
        abstract = True
    