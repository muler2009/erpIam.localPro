import uuid
from django.db import models
from iam.role.models.models import IamRoleModel
from .approval_entry_criteria import ApprovalEntryCriteriaModel
from .workflow_action_model import WorkflowActionModel


class ApprovalProcessModel(models.Model):
    """
        represents the overarching workflow or approval process.
    """
    process_id = models.UUIDField(db_index=True, default=uuid.uuid4, primary_key=True, editable=False, help_text="Approval Process")
    process_name = models.CharField(max_length=100, unique=True)
    active = models.BooleanField(default=True)
    allow_recall = models.BooleanField(default=False)
    entry_criteria = models.ForeignKey(ApprovalEntryCriteriaModel, related_name="entry_criteria", on_delete=models.CASCADE, null=True, blank=True)
    final_approval_record_lock = models.BooleanField(default=False)
    final_rejection_record_lock = models.BooleanField(default=False)
    record_editability = models.CharField(max_length=50, 
        choices=[
            ("AdminOnly", "AdminOnly"),
            ("AdminOrCurrentApprover", "AdminOrCurrentApprover"),
        ],
        default="AdminOnly"
    )
    show_approval_history = models.BooleanField(default=True)
    allowed_submitter = models.ManyToManyField(IamRoleModel, related_name="allowed_submitter_roles",  help_text="Roles allowed to submit records for this approval process")

    def __str__(self):
        return f"{self.process_name}"
    
    class Meta:
        db_table = "ApprovalProcessTable"
        verbose_name = "ApprovalProcess"
        db_table_comment = "Approval Process model"
    

