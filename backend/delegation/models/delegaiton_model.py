import uuid
from django.utils import timezone
from django.db import models
from iam.models import UserAccountsModel
from django.core.exceptions import ValidationError


class DelegationModel(models.Model):
    delegation_id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False, unique=True)
    delegator = models.ForeignKey(UserAccountsModel, related_name='delegations', on_delete=models.CASCADE)
    delegatee_user = models.ForeignKey(UserAccountsModel, related_name='delegatee', on_delete=models.CASCADE)
    delegation_start_date = models.DateTimeField(null=True, blank=True)
    delegation_end_date = models.DateTimeField(null=True, blank=True)
    is_delegation_active = models.BooleanField(default=True)


    def __str__(self):
        return super().__str__()
    
    def is_active(self):
        """Check if the delegation is currently active."""
        now = timezone.now()
        return self.is_delegation_active and self.start_date <= now <= self.end_date
    

