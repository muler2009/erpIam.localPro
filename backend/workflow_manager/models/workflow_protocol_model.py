from django.db import models
import uuid


class WorkFlowProtocolModel(models.Model):
    protocol_id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False, unique=True, db_index=True)
    protocol_name = models.CharField(max_length=150, null=False, blank=False)
    protocol_description = models.TextField(null=True, blank=True)

    def __str__(self) -> str:
        return f"{self.protocol_name}"
    
    class Meta:
        ordering = ["protocol_name"]
        db_table = "Protocol"
        verbose_name = "Process"
        app_label = "workflow_manager"


