from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import serializers
from iam.models import UserAccountsModel
from utils.custom_exception_handler import AuthenticationFailedException
from ..audit.views.util_classes.login_event_audit import LoginEventAuditLog
from axes.handlers.proxy import AxesProxyHandler
from axes.signals import user_login_failed
from utils.system_auth_backend import LDAPWithAxesBackend
from ..helpers.access_log import access_log_up_on_successful_login, access_failure_log_record

class UserTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        if not user:
            raise AuthenticationFailed('User is not available', code='authentication_failed')
        token = super().get_token(user)
        token['username'] = user.username
        return token
    

    
class LoginUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length = 100)
    password = serializers.CharField(max_length = 255, write_only=True)
    full_name = serializers.CharField(max_length=255, read_only=True)
    access = serializers.CharField(max_length=255, read_only=True)
    refresh = serializers.CharField(max_length=255, read_only=True)
    group = serializers.CharField(max_length = 100, read_only=True )
    is_active = serializers.BooleanField(read_only=True)

    class Meta:
        model = UserAccountsModel
        fields = ['username', 'password', 'group', 'full_name', 'access', 'refresh', 'is_active' ]

    
    def validate(self, attrs):
        username = attrs.get('username')  # Get the username
        password = attrs.get('password')  # get the password
        request = self.context.get('request')

        if AxesProxyHandler.is_locked(request, credentials={'username': username}):
            raise AuthenticationFailedException(
                message="Your account has been locked due to too many failed login attempts.",
                error_type="Account Locked",
                status_code=423
            )
    
        ldap_backend = LDAPWithAxesBackend()
        user = ldap_backend.authenticate(request, username=username, password=password)  

        login_type = 1 if user else 0
        if user:
            user_id = getattr(user, "user_account_id", None)
            is_super_user = getattr(user, "is_superuser", None)
            # log to the access log 
            access_log_up_on_successful_login(request, user, is_super_user)
            
        else:
            # Fetch the user by username to get the user_id even if authentication fails
            user_obj = UserAccountsModel.objects.filter(username=username).first()
            user_id = user_obj.user_account_id if user_obj else None
            is_super_user = user_obj.is_superuser if user_obj else False
            
            # if user_obj:
            #     access_failure_log_record(request, user_obj)  # Log the failure attempt

            # send signal when the user fails to axes
            user_login_failed.send(sender=self.__class__, request=self.context['request'], credentials={'username': username, 'password': password})

        LoginEventAuditLog().login_event_audit(request, login_type, user_id, username, is_super_user)


        if(username is None or password is None):
            raise AuthenticationFailedException(message="Username or password is empty!", error_type="Authentication Error", status_code=403) 
        
        if not user:
            raise AuthenticationFailedException(message="User with credentials not Found!", error_type="Authentication Error", status_code=401) 
        
        # Ensure that `user` is an instance of your `UserAccountsModel`
        if not isinstance(user, UserAccountsModel):
            raise AuthenticationFailedException(message="Invalid user model returned from LDAP", error_type="Authentication Error", status_code=400)

        # Check if the account is deactivated
        if not user.is_active:
            raise AuthenticationFailedException(message="Please contact system administrator.", error_type="Account Deactivated!", status_code=403)
        
        user_token = user.get_tokens_for_user() 
        
        return {
            "username": user.username,
            "full_name": user.get_full_account_name,
            "group": user.group,
            "access": user_token.get('access'),
            "refresh": user_token.get("refresh"),
            "is_active": user.is_active,
        }


   


