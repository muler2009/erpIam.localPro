from typing import Iterable
from django.db import models
import uuid
from iam.models import UserAccountsModel
from .workflow_state_model import WorkFlowStateModel
from .workflow_protocol_model import WorkFlowProtocolModel

class RequestInWorkFlowModel(models.Model):

    request_id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False, unique=True)
    title = models.CharField(max_length=150, null=False, blank=False)
    requesting_user = models.ForeignKey(UserAccountsModel, on_delete=models.CASCADE, related_name='user_request')
    request_assigned_to_user = models.ForeignKey(UserAccountsModel, on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_request')
    current_state = models.ForeignKey(WorkFlowStateModel, on_delete=models.CASCADE, related_name='state', null=True, blank=True)
    request_type = models.ForeignKey(WorkFlowProtocolModel, on_delete=models.CASCADE, related_name='user_protocol')
    request_sent_at = models.DateTimeField(auto_now_add=True)
    request_updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.title}"
    
    # Since setting this default value frequently, 
    # might want to cache the draft state to avoid repeated database queries
    @classmethod
    def get_default_state(cls):
        if not hasattr(cls, '_draft_state'):
            cls._draft_state = WorkFlowStateModel.objects.filter(state_name='Draft').first()
            return cls._draft_state

    class Meta:
        ordering = ["title"]
        db_table = "WorkFlow_Request"
        verbose_name = "WorkFlow_Requests"
        app_label = "workflow_manager"


    # The default save instance logic 
    def save(self, using='erp_db', *args, **kwargs) -> None:
        if self.current_state is None:
            self.current_state = self.get_default_state()
        super().save(*args, **kwargs)

