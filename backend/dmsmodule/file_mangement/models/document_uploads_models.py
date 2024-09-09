import uuid
from django.db import models
from dmsmodule.folder.models.models import FolderModel
from dmsmodule.helper.file_extension_validator import FileExtensionValidator

"""
    Tracks each version of the document, including the file, who uploaded it, and when.
"""

class DocumentVersion(models.Model):
    document_version_id = models.UUIDField(db_index=True, default=uuid.uuid4, primary_key=True, editable=False)
    folder = models.ForeignKey(FolderModel, on_delete=models.CASCADE, related_name='documents', null=True, blank=True)
    document = models.OneToOneField('DocumentInformation', on_delete=models.CASCADE, related_name='document_information', null=True, blank=True)
    version_number = models.DecimalField(max_digits=3, decimal_places=1, null=True, blank=True)
    document_name = models.CharField(max_length=255)
    uploaded_file = models.FileField(upload_to='pdf_files/', validators=[FileExtensionValidator(extensions=['.docx', '.xlsx', '.ppt', '.pdf'])])
    uploaded_file_date = models.DateTimeField(auto_now_add=True)
    updated_file_date = models.DateTimeField(auto_now=True)

    @property
    def get_document_name(self):
        return f"{self.document_name}"
    
    def __str__(self) -> str:
        return f"{self.document_name}"
    
    class Meta:
        ordering = ["document_name"]  # Ordering the group
        base_manager_name = "objects" # ORM manager t
        db_table = "Document_Version" # table name
        verbose_name = "Document"
        db_table_comment = "Uploaded document table DMS"  