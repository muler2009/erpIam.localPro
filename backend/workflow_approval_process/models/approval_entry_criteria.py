from django.db import models
from .approval_step_model import ApprovalStepModel


class ApprovalEntryCriteriaModel(models.Model):
    """
    Represents the entry criteria for an approval process or stage.
    """
    stage = models.ForeignKey(
        ApprovalStepModel,
        on_delete=models.CASCADE,
        related_name="entry_criteria",
        help_text="Approval stage associated with this entry criteria."
    )
    boolean_filter = models.CharField(
        max_length=255,
        null=True,
        blank=True,
        help_text="Filter logic for criteria items (e.g., '(1 AND 2) OR 3')."
    )
    formula = models.TextField(
        null=True,
        blank=True,
        help_text="Formula that must evaluate to true for a record to enter this stage."
    )

    def __str__(self):
        return f"Criteria for Stage: {self.stage.stage_name}"
