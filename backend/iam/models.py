from django.db import models
import uuid, ldap
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, Group, Permission
from iam.users.manager import UserAccountsManager
from django.conf import settings
from utils.set_default_password import set_default_password
from rest_framework_simplejwt.tokens import RefreshToken

"""
    a user account model for storing user in the database and the ldap directory for authenthication 
"""

class UserAccountsModel(AbstractBaseUser):
    user_account_id = models.UUIDField(db_index=True, default=uuid.uuid4, primary_key=True, editable=False, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255, blank=True, null=True)
    username = models.CharField(verbose_name="Username", max_length=255, unique=True)
    password = models.CharField(max_length=255, blank=True)
    email = models.EmailField(max_length=254, unique=True)
    userId = models.IntegerField(blank=True, null=True)
    group = models.ForeignKey('iam_groups.PosixGroupUserModel', null=True, blank=True, on_delete=models.SET_NULL, related_name="user_groups")
    home_directory = models.CharField(max_length=255, null=True, blank=True)
    account_created_at = models.DateTimeField(auto_now_add=True)
    account_modified_at = models.DateTimeField(auto_now=True)
    is_staff = models.BooleanField(default=False, blank=True)  # does the instance can login
    is_active = models.BooleanField(default=True)  # simple user in the system application
    is_superuser = models.BooleanField(default=False) # a super or admin user 
    
    objects = UserAccountsManager()  # User manager 
    
    USERNAME_FIELD = 'username'  # user identification field
    REQUIRED_FIELDS = ['email', 'first_name', 'last_name']  # required field

    _plain_password = None  # Temporary attribute to store plain password used in the ldap

    class Meta:
        ordering = ['username']
        app_label = 'iam'
        verbose_name = "User Account"
        db_table = "User"
       
    def __str__(self):
        return f"{self.username}"
        
    def set_password(self, raw_password):
        self._plain_password = raw_password  # Store plain password temporarily
        super().set_password(raw_password)  # Hash and set the password

    def has_perm(self, perm, obj=None):
        # Simplistic permission check: superuser has all permissions
        return self.is_superuser

    def has_module_perms(self, app_label):
        # Simplistic permission check: superuser has all module permissions
        return self.is_superuser
    
    @property
    def get_full_account_name(self):
        return f"{self.first_name} {self.last_name}"
    
    def get_tokens_for_user(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }
    
    def save(self, *args, **kwargs):
        if not self.userId:  # Check if the instance is being created
            # Retrieve the maximum existing userId and increment it by one
            max_id = UserAccountsModel.objects.aggregate(models.Max('userId'))['userId__max']
            self.userId = 1001 if max_id is None else max_id + 1

        if not self.password:
            password = set_default_password()
            self.password = password

        super().save(*args, **kwargs)

    
    
