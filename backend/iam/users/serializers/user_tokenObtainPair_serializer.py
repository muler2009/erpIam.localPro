from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import serializers
from iam.models import UserAccountsModel
from django_auth_ldap.backend import LDAPBackend
from utils.custom_exception_handler import AuthenticationFailedException


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
        ldap_backend = LDAPBackend()
        user = ldap_backend.authenticate(request, username=username, password=password)  

        if(username is None or password is None):
            raise AuthenticationFailedException(message="Username or password is empty!", error_type="Authentication Error", status_code=403) 
        
        if not user:
            raise AuthenticationFailedException(message="User with credentials not Found!", error_type="Authentication Error", status_code=401) 
        
        # Ensure that `user` is an instance of your `UserAccountsModel`
        if not isinstance(user, UserAccountsModel):
            raise AuthenticationFailedException(message="Invalid user model returned from LDAP", error_type="Authentication Error", status_code=400)

        # Check if the account is deactivated
        if not user.is_active:
            raise AuthenticationFailedException(message="Account is deactivated. Please contact support.", error_type="Deactivation Error", status_code=403)
        
        user_token = user.get_tokens_for_user() 
        
        return {
            "username": user.username,
            "full_name": user.get_full_account_name,
            "group": user.group,
            "access": user_token.get('access'),
            "refresh": user_token.get("refresh"),
            "is_active": user.is_active,
        }


