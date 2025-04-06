from easyaudit.models import LoginEvent
from django.utils.timezone import now
from django.core.cache import cache

class LoginEventAuditLog:
    def login_event_audit(self, request, login_type, user_id, username, is_super_user):

        if request and not is_super_user:
            LoginEvent.objects.create(
                    datetime = now(),
                    user_id=user_id,
                    remote_ip = self.get_client_ip(request),
                    login_type = login_type,
                    username = username
                    # user_agent = request.META.get("HTTP_USER_AGENT", ""),
                )
            
    def logout_event_audit_logs(self, request, user_id, login_type, username, is_super_user):
        if request and not is_super_user:
            LoginEvent.objects.create(
                    datetime = now(),
                    user_id=user_id,
                    remote_ip = self.get_client_ip(request),
                    login_type = login_type,
                    username = username
                    # user_agent = request.META.get("HTTP_USER_AGENT", ""),
                )

    def get_client_ip(self, request):
        x_forward_for = request.META.get("HTTP_X_FORWARDED_FOR")
        return x_forward_for.split(",")[0] if x_forward_for else request.META.get("REMOTE_ADDR")
    


def user_number_of_trial():
    cache_key = 0