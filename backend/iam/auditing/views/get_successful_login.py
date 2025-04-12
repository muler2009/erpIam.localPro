from .base_get_request_handler import BaseAccessLogsHandler
from rest_framework import status
from rest_framework.response import Response
from ..serializer.get_access_successful_logs_serialzier import AccessSuccessfulLogsSerializer, AccessFailureLogsSerializer
from axes.models import AccessLog
from iam.auditing.models.custom_access_log_failure import AccessFailureLogModel
from iam.access_policy.authorization_policy import IsAuthenticatedAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.utils.timezone import timedelta, now
from collections import defaultdict
from django.utils.timezone import localtime


class AccessSuccessfulLogsRequestHandler(BaseAccessLogsHandler):
    authentication_classes =[JWTAuthentication]
    permission_classes = [IsAuthenticatedAdminUser]  # 
    serializer_class = AccessSuccessfulLogsSerializer
    queryset = AccessLog.objects.all()


class AccessFailureLogsRequestHandler(BaseAccessLogsHandler):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticatedAdminUser]
    serializer_class = AccessFailureLogsSerializer
    queryset = AccessFailureLogModel.objects.all()


class CategorizedAccessLogView(BaseAccessLogsHandler):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticatedAdminUser]
    serializer_class = AccessFailureLogsSerializer 
    queryset = AccessFailureLogModel.objects.all() 

    def get(self, request, *args, **kwargs):
        logs = self.get_queryset()
        grouped_logs = defaultdict(list)

        for log in logs:
            date_str = localtime(log.attempt_time).date().isoformat()
            grouped_logs[date_str].append(log)

        # Convert to list of objects with `date` and `logs`
        response_data = []
        for date, logs in sorted(grouped_logs.items(), reverse=True):  # Optional: reverse to get latest first
            serialized_logs = self.serializer_class(logs, many=True).data
            response_data.append({
                "date": date,
                "logs": serialized_logs
            })

        return Response(response_data, status=status.HTTP_200_OK)