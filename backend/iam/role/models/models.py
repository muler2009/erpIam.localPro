from django.db import models
import uuid
from iam.models import UserAccountsModel

# Create your models here.

class IamRoleModel(models.Model):

    class RoleStatus(models.TextChoices):
        Active = "active", "active"
        Iactive = "inactive", "inactive"
        Deprecated = "deprecated", "deprecated"
      
    role_id = models.UUIDField(db_index=True, default=uuid.uuid4, primary_key=True, editable=False, unique=True)
    role_name = models.CharField(max_length=100)
    users = models.ManyToManyField(UserAccountsModel, related_name='roles')
    role_description = models.TextField(max_length=255, null=True, blank=True)
    role_scope = models.CharField(max_length=150, null=True, blank=True)
    role_status = models.CharField(max_length=150, choices=RoleStatus.choices, default=RoleStatus.Active)
    role_created_at = models.DateTimeField(auto_now=True)
    role_modified_date = models.DateTimeField(auto_now_add=True)
    # role_expired_date = models.DateTimeField(auto_now_add=True)
    # role_owner = models.CharField(max_length=100)

    class Meta:
        ordering = ['role_name']
        app_label = 'iam_role'
        db_table = 'Role'

    def __str__(self) -> str:
        return f"{self.role_name}"

