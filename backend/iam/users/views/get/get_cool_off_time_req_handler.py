from rest_framework import generics
from rest_framework.response import Response
from iam.access_policy.authorization_policy import AllowAnyUsersToLoginAccessPolicy
from config.settings import axes 
from axes.models import AccessAttempt
from django.utils.timezone import timedelta, now



class AxesConfigCoolOffTime(generics.GenericAPIView):
    permission_classes = [AllowAnyUsersToLoginAccessPolicy]

    # def get(self, request):
    #     cooloff_time = getattr(axes, "AXES_COOLOFF_TIME", None)
    #     return Response({
    #         "cooloff_time": cooloff_time
    #     })
    
    def get(self, request):
        client_ip = self.get_client_ip(request)
        # Get the latest failed attempt for this IP
        attempt = AccessAttempt.objects.filter(ip_address=client_ip).order_by("-attempt_time").first()

        if attempt and attempt.failures_since_start >= axes.AXES_FAILURE_LIMIT:
            unlock_time = attempt.attempt_time + axes.AXES_COOLOFF_TIME
            remaining_time = max((unlock_time - now()).total_seconds(), 0)

            return Response({"locked": True, "remaining_time": remaining_time})
        
        return Response({"locked": False, "remaining_time": 0})

    def get_client_ip(self, request):
        """Extract the IP address from the request."""
        x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
        if x_forwarded_for:
            return x_forwarded_for.split(",")[0]
        return request.META.get("REMOTE_ADDR")