import uuid
from django.dispatch import receiver
from ..models.session_tracking_model import SessionTrackerModel
from ..models.session_activity import SessionActivityModel
from django.utils import timezone
from rest_framework_simplejwt.tokens import RefreshToken
from .session_signal import user_logged_in_session_tracker


@receiver(user_logged_in_session_tracker)
def create_session_tracker(sender, user, request, ip_address, refresh_token, user_agent, session_id, **kwargs):
    try:
        token_obj = RefreshToken(refresh_token)
        expiry = timezone.now() + token_obj.access_token.lifetime
    except Exception:
        expiry = None

    session_tracker = SessionTrackerModel.objects.create(
        session_id=session_id,
        user=user,
        impersonator=user,
        ip_address=ip_address,
        user_agent=user_agent,
        auth_method=SessionTrackerModel.AuthMethod.PASSWORD,
        auth_level=1,
        status=SessionTrackerModel.SessionStatus.ACTIVE,
        start_time=timezone.now(),
        expiry_time=expiry,
        device_id=str(uuid.uuid4())[:16],
    )

     # Create an initial session activity
    # SessionActivityModel.objects.create(
    #     session=session_tracker,
    #     activity_type=SessionActivityModel.ActivityType.AUTHENTICATION,
    #     activity_details={"message": "User logged in successfully via password"},
    #     endpoint="iam/account/login/",  # or wherever this login happens
    #     status_code=200,
    #     metadata={
    #         "ip": ip_address,
    #         "user_agent": user_agent,
    #         "auth_type": "jwt"
    #     }
    # )

    return session_tracker


