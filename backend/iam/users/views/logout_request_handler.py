from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from ..audit.views.util_classes.login_event_audit import LoginEventAuditLog
from easyaudit.models import LoginEvent
from django.utils.timezone import now
from iam.auditing.models.session_tracking_model import SessionTrackerModel
import logging
from django.utils import timezone
from iam.auditing.audit_signals.session_signal import user_logged_out_session
from iam.access_policy.authorization_policy import IsAuthenticatedAccessPolicy
from rest_framework_simplejwt.tokens import AccessToken

logger = logging.getLogger(__name__)

class LogoutRequestHandler(generics.GenericAPIView):
    permission_classes = [IsAuthenticatedAccessPolicy]

    def post(self, request):
        refresh_token_str = request.data.get("refreshToken")
        user = request.user
        session_id = None

        if not refresh_token_str:
            return Response({"message": "Missing refreshToken"}, status=400)

        try:
            token_obj = RefreshToken(refresh_token_str)
            session_id = token_obj.get("session_id")  # Extract it from refresh token
            # Verify this session belongs to the current user
            if not SessionTrackerModel.objects.filter(
                user=user,
                session_id=session_id,
                status=SessionTrackerModel.SessionStatus.ACTIVE
            ).exists():
                return Response({"message": "Invalid session"}, status=400)
            token_obj.blacklist()
        except Exception as e:
            return Response({"message": "Invalid or already blacklisted token"}, status=400)

        # Fire logout signal WITH session_id
        user_logged_out_session.send(
            sender=self.__class__,
            user=user,
            request=request,
            session_id=session_id  # 👈 Now it's passed!
        )

        return Response({"detail": "Logout successful"}, status=status.HTTP_205_RESET_CONTENT)

        
    


  
        # # ✅ Log logout event
        # if user:
        #     user_id = getattr(user, "user_account_id", None)
        #     is_super_user = getattr(user, "is_superuser", None)
        #     username = getattr(user, "username", None)
        #     login_type = 3  # Logout event type

        #     value = LoginEventAuditLog().logout_event_audit_logs(request, user_id, login_type, username, is_super_user)
        #     print(f"Logout event recorded: {value}")