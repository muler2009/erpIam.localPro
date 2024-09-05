import uuid
from django.db import models
from iam.role.models.models import IamRoleModel
from iam.models import UserAccountsModel
from .request_model import ApprovedRequestByRequestOwnerModel
from workflow_manager.models.workflow_state_model import WorkFlowStateModel
from workflow_manager.models.approval_level import ApprovalStageModel
from django.conf import settings


class IntermediateRequestModel(models.Model):
    intermediate_request_id = models.UUIDField(db_index=True, default=uuid.uuid4, primary_key=True, unique=True, editable=False)
    user = models.ForeignKey(UserAccountsModel, on_delete=models.SET_NULL, null=True, blank=True)
    # approved_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='approvals')
    stage = models.ForeignKey(ApprovalStageModel, on_delete=models.CASCADE, null=True, blank=True, related_name='intermediate_requests')
    request = models.ForeignKey(ApprovedRequestByRequestOwnerModel, on_delete=models.CASCADE, related_name='approval_stages')
    current_state = models.ForeignKey(WorkFlowStateModel, on_delete=models.SET_NULL, null=True, blank=True)
    stage_name = models.CharField(max_length=255)
    role = models.ForeignKey(IamRoleModel, on_delete=models.CASCADE)
    action_taken = models.CharField(max_length=255, blank=True, null=True)
    comments = models.TextField(blank=True, null=True)
    request_recieved_at = models.DateTimeField(auto_now_add=True)
    request_updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.request}-{self.stage_name}"
    
    class Meta:
        ordering = ["request_recieved_at"]
        db_table = "Intermediate_Request"
        app_label = "workflow_manager"