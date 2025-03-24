from django.db import models
from .approval_entry_criteria import ApprovalEntryCriteriaModel

class FilterItemModel(models.Model):
    """
    Represents individual filter criteria items for ApprovalEntryCriteria.
    """
    criteria = models.ForeignKey(
        ApprovalEntryCriteriaModel,
        on_delete=models.CASCADE,
        related_name="criteria_items",
        help_text="The parent entry criteria to which this filter item belongs."
    )
    criteria_key = models.CharField(
        max_length=50,
        unique=True,
        default=1,
        help_text="A custom key for referencing this filter item in boolean filters."
    )
    field_name = models.CharField(
        max_length=100,
        help_text="The name of the field to filter"
    )
    operator = models.CharField(
        max_length=10,
        choices=[
            ("=", "Equals"),
            ("!=", "Not Equals"),
            (">", "Greater Than"),
            ("<", "Less Than"),
            (">=", "Greater Than or Equals"),
            ("<=", "Less Than or Equals"),
            ("IN", "In"),
            ("NOT IN", "Not In")
        ],
        help_text="The operator for the filter condition."
    )
    value = models.JSONField(
        help_text="The value(s) for the condition. Can be a single value or a list."
    )


    def __str__(self):
        return f"{self.field_name} {self.operator} {self.value}"
    
    class Meta:
        db_table = "FilterItemsModel"
        
    def save(self, *args, **kwargs):
        """
        Automatically update the parent ApprovalCriteriaModel's boolean_filter when a new FilterItemModel is created.
        """
        super().save(*args, **kwargs)
        self.criteria.update_boolean_filter()