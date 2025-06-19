from rest_framework import generics, mixins, status
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from ..serializer.unlock_manual_serialzier import ManualUnlockSerializer
from iam.access_policy.authorization_policy import IsAuthenticatedAdminUser
from utils.custom_exception_handler import CustomExceptionForError
from axes.handlers.proxy import AxesProxyHandler


class UnlockLockedRequestHandler(generics.GenericAPIView, mixins.CreateModelMixin):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticatedAdminUser]
    serializer_class = ManualUnlockSerializer

    def post(self, request):
        data = request.data
        try:
            serializer = ManualUnlockSerializer(data=data, context={'request': request})
            if not serializer.is_valid():
                raise CustomExceptionForError(message=serializer.errors)
            
            username = serializer.validated_data.get("username")
            ip = serializer.validated_data.get("ip_address")
            if AxesProxyHandler.is_locked(request, credentials={"username": username}):
                AxesProxyHandler.reset_attempts(username=username, ip_address=ip)

        except CustomExceptionForError as exception:
            return Response({
                "message": exception.message,
                "error_type": exception.error_type,
                "status_code": exception.status_code
            }, status=getattr(exception, "status_code", status.HTTP_400_BAD_REQUEST))
        
        else:
            return Response({"detail": "Account Unlocked Successfully"}, status=status.HTTP_200_OK)
