from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from ..audit.views.util_classes.login_event_audit import LoginEventAuditLog
from easyaudit.models import LoginEvent
from django.utils.timezone import now
import logging

logger = logging.getLogger(__name__)

class LogoutRequestHandler(generics.GenericAPIView):
     def post(self, request, *args, **kwargs):
        refresh_token = request.data.get("refreshToken")
        user = request.user

        if not refresh_token:
            return Response({"error": "Refresh token not provided."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # ✅ Blacklist the refresh token
            token = RefreshToken(refresh_token)
            token.blacklist()
            logger.info(f"Refresh token blacklisted for user: {user}")

        except Exception as e:
            logger.error(f"Token blacklist failed: {e}")
            return Response({"error": "Invalid token or already blacklisted"}, status=status.HTTP_400_BAD_REQUEST)

        # ✅ Log logout event
        if user:
            user_id = getattr(user, "user_account_id", None)
            is_super_user = getattr(user, "is_superuser", None)
            username = getattr(user, "username", None)
            login_type = 3  # Logout event type

            value = LoginEventAuditLog().logout_event_audit_logs(request, user_id, login_type, username, is_super_user)
            print(f"Logout event recorded: {value}")

        return Response({"message": "Logout Successfully!"}, status=status.HTTP_200_OK)

        
    


  