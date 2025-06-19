import uuid
from django.utils.deprecation import MiddlewareMixin
from django.utils.timezone import now
from ..auditing.models.session_activity import SessionActivityModel
from ..auditing.models.session_tracking_model import SessionTrackerModel
from ..users.helpers.ip_finder import get_client_requesting_ip_address
import logging

logger = logging.getLogger(__name__)

class SessionActivityMiddleware(MiddlewareMixin):
    def process_view(self, request, view_func, view_args, view_kwargs):
        """Store the start time of the request for duration calculation"""
        request._start_time = now()
        return None

    def process_response(self, request, response):
        """Track authenticated user activities"""
        # Skip if not authenticated user
        if not hasattr(request, 'user') or not request.user.is_authenticated:
            return response

        try:
            # Get session_id from JWT token (works for both access and refresh tokens)
            session_id = None
            if hasattr(request, 'auth'):
                # For access tokens (from Authentication header)
                session_id = request.auth.payload.get('session_id')
            elif request.data.get('refresh'):
                # For refresh tokens (in request body)
                from rest_framework_simplejwt.tokens import RefreshToken
                try:
                    refresh = RefreshToken(request.data['refresh'])
                    session_id = refresh.get('session_id')
                except:
                    pass

            if not session_id:
                logger.debug("No session_id found in request")
                return response

            # Find the active session
            session = SessionTrackerModel.objects.filter(
                session_id=session_id,
                status=SessionTrackerModel.SessionStatus.ACTIVE
            ).first()

            if session:
                duration_ms = (now() - request._start_time).total_seconds() * 1000

                SessionActivityModel.objects.create(
                    session=session,
                    activity_type=SessionActivityModel.ActivityType.ACCESS,
                    activity_details={
                        "method": request.method,
                        "path": request.path,
                        "status": response.status_code,
                        # "view": view_func.__name__,
                    },
                    endpoint=request.path,
                    status_code=response.status_code,
                    metadata={
                        "user_agent": request.META.get("HTTP_USER_AGENT"),
                        "ip": get_client_requesting_ip_address(request),
                        "duration_ms": round(duration_ms, 2),
                        "query_params": dict(request.GET),
                    },
                )
                logger.debug(f"Logged activity for session {session_id}")

        except Exception as e:
            logger.error(f"Failed to log session activity: {str(e)}", exc_info=True)

        return response
