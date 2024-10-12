import uuid
from django.db import models
from decimal import Decimal

class PolicyModel(models.Model):
    """
    Represents a custom managed policy created by the admin to control access.
    """
    policy_id = models.UUIDField(db_index=True, default=uuid.uuid4, primary_key=True, editable=False, unique=True)
    policy_verison = models.DecimalField(max_digits=3, decimal_places=1, null=True, blank=True)
    policy_name = models.CharField(max_length=100, unique=True)  # Policy name


    def __str__(self):
        return f"{self.policy_name}"
    
    class Meta:
       ordering = ["policy_name"]
       db_table = 'PolicyModel'
       app_label = 'iam_policy'


    def save(self, *args, **kwargs):
        if not self.policy_verison:  # Check if the object is being created
            self.policy_verison = Decimal(1.0)  # Initialize version to 1.0 on creation
        else:
            self.policy_verison += Decimal(0.1)  # Increment version on update

        super().save(*args, **kwargs)





