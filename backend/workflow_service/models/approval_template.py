import uuid
from django.db import models
from .approval_process import ApprovalProcessModel
from .approval_step_approver import ApprovalStepApprovers
from .template import TemplateModel


class ApprovalTemplateModel(models.Model):
    """
        Represents a stage template in an approval process.
        This model represent a stage template, defining the stages that are part of a particular process.
    """
    template_id = models.UUIDField(db_index=True, default=uuid.uuid4, primary_key=True, editable=False, unique=True)
    process_type = models.ForeignKey(ApprovalProcessModel, on_delete=models.CASCADE, related_name='stage_templates')
    stage_name = models.ForeignKey(TemplateModel, on_delete=models.CASCADE, related_name="templates") 
    approvers = models.ForeignKey(ApprovalStepApprovers, on_delete=models.CASCADE, related_name='approvers', null=True, blank=True)
    stage_order = models.PositiveIntegerField(default=1, null=False, blank=False)  # Order of the stage in the process
    template_entry_criteria = models.OneToOneField(
        "ApprovalEntryCriteriaModel",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="associated_template",
        help_text="The criteria required to enter this template stage."
    )

    def __str__(self):
        return f"{self.stage_name} - ({self.process_type.process_name})"
    
    class Meta:
        ordering = ['stage_name']
        db_table = "ApprovalTemplateTable" # table name
        verbose_name = "ApprovalTemplate"
       