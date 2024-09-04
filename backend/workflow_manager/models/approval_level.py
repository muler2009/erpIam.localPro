import uuid
from django.db import models
from iam.role.models.models import IamRoleModel
# from workflow_manager.models.request_model import ApprovedRequestByRequestOwnerModel
from .workflow_transition_model import WorkFlowTransitionModel
from iam.models import UserAccountsModel

# Links each approval level to a role, making the level-role mapping dynamic.
class ApprovalStageModel(models.Model):
    approval_stage_id = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True, editable=False)
    request = models.ForeignKey('ApprovedRequestByRequestOwnerModel', on_delete=models.CASCADE, related_name='request_approval_stages')
    assigned_user = models.ForeignKey(UserAccountsModel, null=True, blank=True, on_delete=models.SET_NULL)  # Assigned user for the stage
    stage_name = models.CharField(max_length=100)  # e.g., 'Record Review', 'Finance Review', etc.
    stage_level = models.PositiveIntegerField(default=1, null=False, blank=False)  # Order of the stage in the process
    role = models.ForeignKey(IamRoleModel, on_delete=models.CASCADE, related_name='role_approval_stages')
    transition = models.ForeignKey(WorkFlowTransitionModel, on_delete=models.SET_NULL, null=True, blank=True)
    comments = models.TextField(null=True, blank=True)
    approved_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)



    def __str__(self) -> str:
        return f"{self.request} - {self.stage_name}"
    
    class Meta:
        ordering = ['stage_level']
        db_table = 'Approval_Level'
        app_label = 'workflow_manager'