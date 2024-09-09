from typing import Iterable
from django.db import models
import uuid
from iam.models import UserAccountsModel
from .workflow_state_model import WorkFlowStateModel
from .workflow_protocol_model import WorkFlowProtocolModel
from .workflow_action_model import WorkFlowActionsModel
from dmsmodule.file_mangement.models.document_uploads_models import DocumentVersion


class RequestInWorkFlowModel(models.Model):
    request_id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False, unique=True)
    title = models.CharField(max_length=150, null=False, blank=False)
    request_sent_at = models.DateTimeField(auto_now_add=True)
    request_updated_at = models.DateTimeField(auto_now=True)
    file_for_approval = models.ForeignKey(DocumentVersion, on_delete=models.SET_NULL, null=True, blank=True)
    current_stage = models.ForeignKey('ApprovalStageModel', on_delete=models.SET_NULL, null=True, blank=True)
    approved_by = models.ForeignKey(UserAccountsModel, on_delete=models.CASCADE, null=True, blank=True )
   
    class Meta:
        abstract = True


# A model to store  UnApprovedRequestByOwnerModel
class UnApprovedRequestByOwnerModel(RequestInWorkFlowModel):
    '''
        A model to store unapproved request in the requesting user side 
    '''
    approval_status = models.ForeignKey(WorkFlowStateModel, on_delete=models.CASCADE, related_name='owner_approved', null=True, blank=True)
    requesting_user = models.ForeignKey(UserAccountsModel, on_delete=models.CASCADE, related_name='requests_unapproved')
    request_assigned_to_user = models.ForeignKey(UserAccountsModel, on_delete=models.SET_NULL, null=True, blank=True, related_name='to_requests_unapproved')
    request_type = models.ForeignKey(WorkFlowProtocolModel, on_delete=models.CASCADE, related_name='requests_unapproved')

    def __str__(self) -> str:
        return f"{self.title}"
    
    class Meta:
        ordering = ["title"]
        db_table = "UnApproved_Requests"
        verbose_name = "UnApproved"
        app_label = "workflow_manager"

    @classmethod
    def get_default_state(cls):
        return WorkFlowStateModel.objects.filter(state_name='Not Approved by Owner').first()
        
    def save(self, using='erp_db', *args, **kwargs) -> None:
        if self.approval_status is None:
            default_state = self.get_default_state()
            if default_state is None:
                raise ValueError("Default approval state 'Not Approved by Owner' not found in the database.")
            self.approval_status = default_state
        super().save(*args, **kwargs)


# Model three --> for storing only approved request by the owner
class ApprovedRequestByRequestOwnerModel(RequestInWorkFlowModel):
    '''
        A model to store approved request by the request initiator i.e requests in pending approval 
    '''
    current_state = models.ForeignKey(WorkFlowStateModel, on_delete=models.CASCADE, related_name='state_approved', null=True, blank=True)
    requesting_user = models.ForeignKey(UserAccountsModel, on_delete=models.CASCADE, related_name='requests_approved')
    request_assigned_to_user = models.ForeignKey(UserAccountsModel, on_delete=models.SET_NULL, null=True, blank=True, related_name='approved_to_requests')
    request_type = models.ForeignKey(WorkFlowProtocolModel, on_delete=models.CASCADE, related_name='requests_approved')

    def __str__(self) -> str:
        return f"{self.title}"
    
    class Meta:
        ordering = ["title"]
        db_table = "Approved_Requests"
        verbose_name = "Approved"
        app_label = "workflow_manager"


    # Since setting this default value frequently, 
    # might want to cache the draft state to avoid repeated database queries
    @classmethod
    def get_default_state(cls):
        return WorkFlowStateModel.objects.filter(state_name='pending for approval').first()
        
    def save(self, using='erp_db', *args, **kwargs) -> None:
        if self.current_state is None:
            default_state = self.get_default_state()
            if default_state is None:
                raise ValueError("Default approval state 'pending for approval' not found in the database.")
            self.current_state = default_state
        super().save(*args, **kwargs)

     


class ApprovedRequestsModel(RequestInWorkFlowModel):
    '''
        A model to store approved request in the requesting user side 
    '''
    current_state = models.ForeignKey(WorkFlowStateModel, on_delete=models.CASCADE, related_name='final_state_approved', null=True, blank=True)
    requesting_user = models.ForeignKey(UserAccountsModel, on_delete=models.CASCADE, related_name='final_requests_approved')
    request_assigned_to_user = models.ForeignKey(UserAccountsModel, on_delete=models.SET_NULL, null=True, blank=True, related_name='final_approved_to_requests')
    request_type = models.ForeignKey(WorkFlowProtocolModel, on_delete=models.CASCADE, related_name='final_requests_approved')

    def __str__(self) -> str:
        return f"{self.title}"
    
    class Meta:
        ordering = ["title"]
        db_table = "Final_Approved_Requests"
        verbose_name = "Final_Approved"
        app_label = "workflow_manager"