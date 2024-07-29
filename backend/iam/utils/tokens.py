from rest_framework_simplejwt.tokens import RefreshToken

class GetTokenForUser(RefreshToken):
    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }