import uuid
from django.db import models


class WorkflowStateModel(models.Model):
    state_id = models.UUIDField(default=uuid.uuid4, db_index=True, primary_key=True, unique=True)
    state_name = models.CharField(max_length=100, null=False, blank=False)
    state_description = models.TextField(max_length=255, null=True, blank=False)
    state_in_protocol = models.ForeignKey('ApprovalProcessModel', on_delete=models.CASCADE, related_name='states')


    def __str__(self) -> str:
        return f"{self.state_name}"
    
    class Meta:
        ordering = ["state_name"]
        db_table_comment = "State table in the workflow"  


    def save(self, *args, **kwargs):
        if WorkflowStateModel.objects.filter(state_name=self.state_name).exists():
            raise ValueError("Duplicate data")
        super().save(*args, **kwargs)