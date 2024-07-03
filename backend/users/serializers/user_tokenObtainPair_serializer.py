from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import AuthenticationFailed


class UserTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        if not user:
            raise AuthenticationFailed('User is not available', code='authentication_failed')
        token = super().get_token(user)
        token['username'] = user.username
        return token