from django.db.models import Count
from rest_framework import generics, mixins, status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from rest_framework.request import Request
from utils.exceptions.exception_classes import CustomExceptionForError
from easyaudit.models import LoginEvent
from iam.access_policy.authorization_policy import IsAuthenticatedAdminUser
from django.utils.timezone import now, timedelta


class LoginEventAuditLogStastics(generics.GenericAPIView, mixins.ListModelMixin):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticatedAdminUser]

    def get(self, request):
        days_range = 2 
        today = now().date()

        start_date = today - timedelta(days=days_range)

        login_stat = (LoginEvent.objects.filter(login_type=1, datetime__date__gte=start_date).values("datetime__date").annotate(login_count=Count("id")))

        login_statics_dict = {
            item["datetime__date"]: item["login_count"] for item in login_stat
        }
        
        statstics_data = [
            {
                "date": (start_date + timedelta(days=i)).strftime("%Y-%m-%d"),
                "logins": login_statics_dict.get(start_date + timedelta(days=i), 0) 
            }  for i in range(days_range + 1)
        ]
       
            
            
            
        return Response(statstics_data)
            