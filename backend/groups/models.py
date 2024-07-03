from django.db import models
from django.contrib.auth.models import Group
import uuid


class PosixGroupUserModel(models.Model):
    group_id = models.UUIDField(db_index=True, default=uuid.uuid4, primary_key=True, unique=True, editable=False)
    group_name = models.CharField(max_length=255)
    group_posix_Id = models.IntegerField(null=True, blank=True)
    group_abbreviation = models.CharField(max_length=50)
    group_description = models.CharField(max_length=255, null=True, blank=True)
    members = models.ManyToManyField('users.UserAccountsModel', blank=True, null=True, related_name='useraccount_groups')
    
    class Meta:
        ordering = ["group_name"]  # Ordering the group
        base_manager_name = "objects" # ORM manager t
        db_table = "PosixGroup" # table name
        verbose_name = "Posix_Group"
        db_table_comment = "Group table for the user account"  
    
    def __str__(self) -> str:
        return f"{self.group_name}"