import uuid
from django.db import models
from dmsmodule.folder.models import FolderModel
from iam.models import UserAccountsModel
from dmsmodule.helper.file_extension_validator import FileExtensionValidator

class DocumentVersionModel(models.Model):
    document_version_id = models.UUIDField(db_index=True, default=uuid.uuid4, primary_key=True, editable=False)
    document = models.ForeignKey('DocumentModel', on_delete=models.CASCADE, related_name='documents', null=True, blank=True)
    version_number = models.DecimalField(max_digits=3, decimal_places=1, null=True, blank=True)
    uploaded_file = models.FileField(upload_to='pdf_files/', validators=[FileExtensionValidator(extensions=['.docx', '.xlsx', '.ppt', '.pdf'])])
    uploaded_by = models.ForeignKey(UserAccountsModel, on_delete=models.CASCADE)  
    uploaded_at = models.DateTimeField(auto_now_add=True)  
    updated_at = models.DateTimeField(auto_now=True)
    is_current = models.BooleanField(default=False)  # Track if this is the current version

    @property
    def get_document_name(self):
        return f"{self.document.document_name}"
    
    def __str__(self) -> str:
        return f"{self.document.document_name}"
    
    class Meta:
        base_manager_name = "objects" # ORM manager t
        db_table = "Version" # table name
        verbose_name = "Version"
     
