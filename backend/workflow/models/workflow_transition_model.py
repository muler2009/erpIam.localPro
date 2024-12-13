from django.db import models
from .workflow_action_model import WorkflowActionModel
from .approval_type_model import ApprovalProcessTypeModel
from .workflow_state_model import WorkflowStateModel


class WorkflowProcessTransitionModel(models.Model):
    transition_name = models.CharField(max_length=150, null=True, blank=True) 
    action_name = models.ForeignKey(
        WorkflowActionModel,
        on_delete=models.CASCADE,
        related_name="transitions_action"
    )
    protocol_name = models.ForeignKey(
        ApprovalProcessTypeModel,
        on_delete=models.CASCADE,
        related_name="transitions_protocol"
    )
    from_state = models.ForeignKey(
        WorkflowStateModel,
        on_delete=models.CASCADE,
        related_name="transitions_from_state"
    )
    to_state = models.ForeignKey(
        WorkflowStateModel,
        on_delete=models.CASCADE,
        related_name="transitions_to_state"
    )

    def __str__(self):
        return f"{self.transition_name}: {self.from_state} -> {self.to_state}"