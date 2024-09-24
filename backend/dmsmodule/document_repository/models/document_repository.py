import uuid
from django.db import models
from iam.models import UserAccountsModel


class DocumentRepositoryModel(models.Model):
    repository_id = models.UUIDField(db_index=True, default=uuid.uuid4, primary_key=True, editable=False, unique=True)
    repository_name = models.CharField(max_length=255, null=True, blank=True)
    repository_description = models.TextField(max_length=255, null=True, blank=True)
    repository_document_type = models.CharField(max_length=100, null=True, blank=True)
    repository_created_by = models.ForeignKey(UserAccountsModel, on_delete=models.CASCADE, related_name='repository_creator')
    repository_created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.repository_name}"
    
    class Meta:
        ordering = ['repository_name']
        db_table = 'Repository_name'
        # app_label = 'dmsmodule'


