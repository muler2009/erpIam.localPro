from django.dispatch import receiver
from django.utils import timezone
from .session_signal import user_logged_out_session
from ..models.session_tracking_model import SessionTrackerModel
from rest_framework_simplejwt.tokens import AccessToken

@receiver(user_logged_out_session)
def terminate_session_tracker(sender, user, session_id=None, **kwargs):
    try:
        session = SessionTrackerModel.objects.filter(
            session_id=session_id,
            user=user,
            status=SessionTrackerModel.SessionStatus.ACTIVE
        ).first()

        if session:
            session.status = SessionTrackerModel.SessionStatus.TERMINATED
            session.end_time = timezone.now()
            session.save()
            print(f"Session terminated: {session.session_id}")
        else:
            print(f"No active session found for {user} with session_id {session_id}")
    except Exception as e:
        print(f"Error terminating session: {e}")