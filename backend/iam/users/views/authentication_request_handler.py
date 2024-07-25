from rest_framework import permissions, status, views
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from django_auth_ldap.backend import LDAPBackend
from rest_framework_simplejwt.tokens import RefreshToken
from utils.custom_exception_handler import AuthenticationFailedException
from iam.users.serializers.user_tokenObtainPair_serializer import UserTokenObtainPairSerializer
import ldap

class AuthenticationRequestHandler(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]  
    serializer_class = UserTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        try:
            ldap_backend = LDAPBackend()
            user = ldap_backend.authenticate(request, username=username, password=password)   
            if user is not None:
                serializer = self.serializer_class()
                token_data = serializer.get_token(user)
                
                # Extract the access and refresh data from the RefreshToken object
                access_token = str(token_data.access_token)
                refresh_token = str(token_data)
                user = user
                
                response_data = {
                    'access': access_token,
                    'refresh': refresh_token,     
                    "user": username
                }
    
                return Response(response_data, status=status.HTTP_200_OK)
            else:
                raise AuthenticationFailedException(message="User with credentials not Found!", error_type="Authentication Error")                
        except AuthenticationFailedException as exc:
            AUTH_REPLY = {
                'error_type'.upper(): exc.error_type,
                'Message'.upper(): exc.message,
                'status_code'.upper(): exc.status_code 
            }
            return Response(AUTH_REPLY, status=status.HTTP_400_BAD_REQUEST)
        except ldap.INVALID_CREDENTIALS:
            # logger.warning(f"Invalid credentials for username: {username}")
            return Response({'error': 'Invalid credentials with the useran'}, status=status.HTTP_401_UNAUTHORIZED)

        except ldap.LDAPError as exc:
            # logger.error(f"LDAP error: {exc}")
            return Response({'error': 'LDAP error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class UserLogoutRequestHandler(views.APIView):
    def post(self, request):
        refreshToken = request.data.get('refreshToken')
        if refreshToken:
            try:
                token = RefreshToken(refreshToken)
                token.blacklist()
                return Response({'message': "Logout Successfully!"}, status=status.HTTP_200_OK)
            except Exception as exception:
               return Response({'error': str(exception)}, status=status.HTTP_400_BAD_REQUEST)
        else:
               return Response({'error': 'Refresh token not provided.'}, status=status.HTTP_400_BAD_REQUEST)