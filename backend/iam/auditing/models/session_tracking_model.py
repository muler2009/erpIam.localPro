from django.db import models
from iam.models import UserAccountsModel
from django.utils import timezone
import uuid


class SessionTrackerModel(models.Model):
    class SessionStatus(models.TextChoices):
        ACTIVE = 'active', 'Active'
        EXPIRED = 'expired', 'Expired'
        TERMINATED = 'terminated', 'Terminated'
        SUSPICIOUS = 'suspicious', 'Suspicious'

    class AuthMethod(models.TextChoices):
        PASSWORD = 'password', 'Password'
        MFA = 'mfa', 'Multi-Factor'
        SSO = 'sso', 'Single Sign-On'
        TOKEN = 'token', 'Token'
        BIOMETRIC = 'biometric', 'Biometric'

    tracking_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)    
    session_id = models.CharField(max_length=255)
    # User Context
    user = models.ForeignKey(UserAccountsModel, on_delete=models.CASCADE, related_name='sessions')
    impersonator = models.ForeignKey(UserAccountsModel, on_delete=models.SET_NULL, null=True, blank=True)
    
    # Timing Information
    start_time = models.DateTimeField(auto_now_add=True)
    last_activity = models.DateTimeField(auto_now=True)
    end_time = models.DateTimeField(null=True, blank=True)
    expiry_time = models.DateTimeField(null=True, blank=True)
    
    # Access Context
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(null=True, blank=True)
    device_id = models.CharField(max_length=255, null=True, blank=True)
    location_data = models.JSONField(null=True, blank=True)  # {country, region, city, coordinates}
    
    # Authentication Details
    auth_method = models.CharField(max_length=20, choices=AuthMethod.choices)
    auth_level = models.PositiveSmallIntegerField(default=1)
    mfa_factors = models.JSONField(default=list, blank=True)  # ['sms', 'totp', 'webauthn']
    
    # Session Status
    status = models.CharField(
        max_length=20, 
        choices=SessionStatus.choices, 
        default=SessionStatus.ACTIVE
    )
    termination_reason = models.CharField(max_length=255, null=True, blank=True)
       
    # Additional Metadata
    # client_app = models.CharField(max_length=100, null=True, blank=True)
    # compliance_tags = models.JSONField(default=list, blank=True)

    class Meta:
        indexes = [
            models.Index(fields=['user']),
            models.Index(fields=['status']),
            models.Index(fields=['start_time']),
            models.Index(fields=['ip_address']),
        ]
        ordering = ['-start_time']

    def __str__(self):
        return f"{self.user} - {self.start_time} ({self.status})"
        
    def duration(self):
        end = self.end_time or timezone.now()
        return end - self.start_time

