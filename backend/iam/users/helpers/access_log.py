from axes.models import AccessAttempt, AccessLog, AccessFailureLog
from iam.auditing.models.custom_access_log_failure import AccessFailureLogModel
from django.utils.timezone import now
from config.settings import axes
from django.db.models import F
from iam.models import UserAccountsModel
from user_agents import parse

"""
    a method for storing access log when user successfully authenticated
"""
def access_log_up_on_successful_login(request, user, is_super_user):
    user_agent_string = request.META.get("HTTP_USER_AGENT")
    user_agent = parse(user_agent_string)
    device_os = user_agent.os.family

    if request and not is_super_user:

        AccessLog.objects.update_or_create(
            username=user.username,
            ip_address =  request.META.get("REMOTE_ADDR"),
            path_info=request.path,
            logout_time = now(),
            user_agent = device_os,
            http_accept = request.META.get("HTTP_ACCEPT", "")
        )
        
        # Reset failed attempts for the user
        AccessAttempt.objects.filter(username=user.username).delete()




# a log method handler when failes to log-in
def access_failure_log_record(request, user_obj, is_super_user, failure_reason):
    client_ip = request.META.get("REMOTE_ADDR")
    today = now().date()  # Get today's date
    username = request.data.get("username")

     # Prepare structured data
    user_info = {
        "user_id": user_obj.get("user_id"),
        "username": user_obj.get("username"),
        "email": user_obj.get("email"),
        "is_superuser": user_obj.get("is_superuser"),
    }
    event = {
        "type": "login_failure",
        "status": "failed",
        "reason": failure_reason,
    }

    risk = {
        "login_risk_score": 0,  # can be calculated later
        "login_anomaly_detected": False,
        "was_challenge_triggered": False,
    }

    user_data = user_info["username"]

    if request and not is_super_user:
        failure_log = AccessFailureLogModel.objects.filter(
            username=username,
            ip_address=client_ip
        ).order_by("-attempt_time").first()

        if failure_log and failure_log.attempt_time.date() == today:
            failure_log.failure_count += 1
            failure_log.failure_reason = failure_reason
            failure_log.user_info = user_info
            failure_log.event = event
            failure_log.risk = risk
            failure_log.attempt_time = now()
            failure_log.save()
        else:
            AccessFailureLogModel.objects.create(
                username=username,
                ip_address=client_ip,
                failure_count=1,
                attempt_time=now(),
                failure_reason=failure_reason,
                user_info=user_info,
                event=event,
                risk=risk,
                user_agent=request.META.get("HTTP_USER_AGENT", ""),
                http_accept=request.META.get("HTTP_ACCEPT", ""),
                path_info=request.path,
            )

       