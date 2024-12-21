from django.db import models

class ApprovalProcessTypeModel(models.Model):
    APPROVAL_TYPES = [
        ('document', 'Document Approval'),
        ('leave', 'Leave Approval'),
        ('expense', 'Expense Approval'),
        ('custom', 'Custom Approval'),  # For user-defined or other types of approval.
    ]

    protocol_name = models.CharField(
        max_length=150,
        help_text="Name of the workflow protocol (e.g., Document Approval)."
    )
    protocol_type = models.CharField(
        max_length=50,
        choices=APPROVAL_TYPES,
        default='custom',
        help_text="Type of approval process (e.g., document, leave, expense)."
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Indicates whether this protocol is currently active."
    )
    description = models.TextField(
        null=True, 
        blank=True, 
        help_text="Detailed description of the approval process."
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.protocol_name}"
    
    class Meta:
        db_table_comment = "Approval entry criteria table in the workflow"  
        db_table = "ApprovalProcessType"
        verbose_name = "ApprovalEntryCriteria"
