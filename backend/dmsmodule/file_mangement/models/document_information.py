from django.db import models
import uuid
from iam.models import UserAccountsModel

"""
    Stores general information about the document.
"""
class DocumentInformation(models.Model):
    document_information_id = models.UUIDField(db_index=True, default=uuid.uuid4, unique=True, primary_key=True)
    document_name = models.CharField(max_length=255)
    current_version = models.ForeignKey('DocumentVersion', on_delete=models.SET_NULL, null=True, blank=True, related_name='current_document')
    created_by = models.ForeignKey(UserAccountsModel, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self) -> str:
        return f"{self.document_name}"
    
    class Meta:
        ordering = ["document_name"]  # Ordering the group
        base_manager_name = "objects" # ORM manager t
        db_table = "Document_Information" # table name
        verbose_name = "Document"
        db_table_comment = "document table DMS"  