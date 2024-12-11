from django.db import models
import uuid
from .workflow_action_model import WorkFlowActionsModel
from .workflow_protocol_model import WorkFlowProtocolModel
from .workflow_state_model import WorkFlowStateModel



class WorkFlowTransitionModel(models.Model):
    transition_id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False, unique=True, db_index=True)
    transition_name = models.CharField(max_length=150, null=True, blank=True)
    action_name = models.ForeignKey(WorkFlowActionsModel, on_delete=models.CASCADE, related_name="transitions_action")
    protocol_name = models.ForeignKey(WorkFlowProtocolModel, on_delete=models.CASCADE, related_name="transitions_protocol")
    from_state = models.ForeignKey(WorkFlowStateModel, on_delete=models.CASCADE, related_name="transitions_from_state")
    to_state = models.ForeignKey(WorkFlowStateModel, on_delete=models.CASCADE, related_name="transitions_to_state")
   
    
    def __str__(self) -> str:
        return f"{self.transition_name}"
    
    class Meta:
        ordering = ["transition_name"]
        db_table = "Transition"
        verbose_name = "Transition"
        app_label = "workflow_manager" 

        
