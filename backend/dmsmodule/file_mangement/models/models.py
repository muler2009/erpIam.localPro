from django.db import models
from dmsmodule.folder.models.models import FolderModel
import uuid

class UploadedDocumentModel(models.Model):
    uploaded_document_id = models.UUIDField(db_index=True, default=uuid.uuid4, primary_key=True, editable=False)
    folder = models.ForeignKey(FolderModel, on_delete=models.CASCADE, related_name='documents')
    uploaded_document_name = models.CharField(max_length=255)
    uploaded_file = models.FileField(upload_to='pdf_files/')
    uploaded_file_date = models.DateTimeField(auto_now_add=True)
    updated_file_date = models.DateTimeField(auto_now=True)

    @property
    def get_uploaded_document_name(self):
        return f"{self.uploaded_document_name}"
    
    def __str__(self) -> str:
        return f"{self.uploaded_document_name}"
    
    class Meta:
        ordering = ["uploaded_document_name"]  # Ordering the group
        base_manager_name = "objects" # ORM manager t
        db_table = "Upload_Document" # table name
        verbose_name = "upload"
        db_table_comment = "Uploaded document table DMS"  