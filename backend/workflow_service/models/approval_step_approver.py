from django.db import models
from iam.models import UserAccountsModel
from iam.role.models.models import IamRoleModel


"""
   ApprovalStepApprovers a model represents the assigned approvers for an approval step.
"""

class ApprovalStepApprovers(models.Model):
    APPROVER_TYPE_CHOICES = [
        ('adhoc', 'Manual Selection'),
        ('user', 'Specific User'),
        ('userHierarchyField', 'User Hierarchy Field'),
        ('relatedUserField', 'Related User Field'),
        ('queue', 'Queue'),
    ]
    class ROUTING_TYPE(models.TextChoices):
        UNANIMOUS = "Unanimous", "Unanimous",
        FIRST_RESPONSE = "FirstResponse", "FirstResponse"

    stage = models.ForeignKey("ApprovalStageModel", on_delete=models.CASCADE, related_name="approvers", help_text="Approval stage to which these approvers are assigned.")
    approver = models.ForeignKey(UserAccountsModel, on_delete=models.CASCADE, related_name="assigned_stages", help_text="User assigned as an approver for this stage.")
    approver_roles = models.ManyToManyField(
        IamRoleModel, 
        related_name="role_approvers", 
        blank=True, 
        help_text="Roles allowed to approve this stage."
    )
    type = models.CharField(
        max_length=50, choices=APPROVER_TYPE_CHOICES, null=True, blank=True,
        help_text="Type of approver (e.g., adhoc, user). Determines how the approver is selected."
    )
    routing_type = models.CharField(max_length=50, choices=ROUTING_TYPE.choices, default=ROUTING_TYPE.UNANIMOUS, help_text="Specifies how to handle approval/rejection when multiple approvers are assigned.")


    def __str__(self):
        return f"{self.approver} for stage {self.stage.stage_name}"
    
    class Meta:
        ordering = ["stage"]
        db_table_comment = "a table keeps approvers in the workflow"  
        db_table = "ApprovalStepApproversTable"
        verbose_name = "ApprovalStepApprovers"
