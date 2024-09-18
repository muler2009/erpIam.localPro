import uuid
from django.db import models
from ..models.document import DocumentModel

class DocumentMetadataModel(models.Model):
    metadata_id = models.UUIDField(db_index=True, default=uuid.uuid4, primary_key=True, editable=False, unique=True)
    document_metadata = models.OneToOneField(DocumentModel, on_delete=models.CASCADE)
    key=models.CharField(max_length=255, null=True, blank=True)

    def __str__(self) -> str:
        return f"{self.key}"
    
    class Meta:
        ordering = ['key']
        db_table = 'Metadata'
        app_label = 'dmsmodule_document_repository'

    def save(self, *args, **kwargs):
        if self.key is None:
            self.key = f"Document - {self.metadata_id}"  
        super().save(args, kwargs)
