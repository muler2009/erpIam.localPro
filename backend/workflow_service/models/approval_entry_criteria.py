from django.db import models
from .steps_model import ApprovalStageModel


class ApprovalEntryCriteriaModel(models.Model):
    """
    Represents the entry criteria for an approval process or stage.
    """
    stage = models.ForeignKey(
        "ApprovalTemplateModel",
        on_delete=models.DO_NOTHING,
        related_name="entry_criteria",
        help_text="Approval stage associated with this entry criteria."
    ) 
    boolean_filter = models.CharField(
        max_length=255,
        null=True,
        blank=True,
        help_text="Filter logic for criteria items"
    )
    formula = models.TextField(
        null=True,
        blank=True,
        help_text="Formula that must evaluate to true for a record to enter this stage."
    )

    def __str__(self):
        return f"Criteria for Stage: {self.stage.stage_name}"

    def update_boolean_filter(self):
        keys = self.criteria_items.values_list("criteria_key", flat=True)
        self.boolean_filter = " AND ".join(keys)
        self.save()
    
    class Meta:
        ordering = ["stage"]
        db_table_comment = "Approval entry criteria table in the workflow"  
        db_table = "ApprovalEntryCriteria"
        verbose_name = "ApprovalEntryCriteria"

