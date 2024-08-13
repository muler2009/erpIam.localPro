from django.db import models
import uuid
from iam.models import UserAccountsModel

# Create your models here.

class UserProfileModel(models.Model):
    profile_id = models.UUIDField(db_index=True, default=uuid.uuid4, unique=True)
    user_profile = models.OneToOneField(UserAccountsModel, on_delete=models.CASCADE, related_name='user_profile')
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    user_profile_image = models.ImageField(upload_to='profile_image/', blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self) -> str:
        return f"{self.user_profile.first_name}"
    
    class Meta:
        ordering = ['user_profile.first_name']
        db_table = 'Profile'
        # base_manager = 'objects'
        app_label = 'user_profile'
