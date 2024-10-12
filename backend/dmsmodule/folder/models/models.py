from django.db import models
import uuid
from iam.models import UserAccountsModel

# Create your models here.
class FolderModel(models.Model):
    folder_identifier = models.UUIDField(db_index=True, default=uuid.uuid4, unique=True, primary_key=True )
    folder_name = models.CharField(max_length=255, null=False, blank=False)
    parent_folder = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name="subfolder")
    folder_created_date = models.DateTimeField(auto_now_add=True)
    folder_updated_date = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(UserAccountsModel, on_delete=models.SET_NULL, null=True, blank=True)


    @property
    def get_folder_name(self):
        return f"{self.folder_name}"
    
    def __str__(self) -> str:
        return f"{self.folder_name}"
    
    class Meta:
        ordering = ["folder_name"]  # Ordering the group
        base_manager_name = "objects" # ORM manager t
        db_table = "Folders" # table name
        verbose_name = "Folders"
        db_table_comment = "Folder table for DMS"  