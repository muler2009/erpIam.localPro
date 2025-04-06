from .base_get_request_handler import BaseAccessLogsHandler
from ..serializer.get_access_successful_logs_serialzier import AccessSuccessfulLogsSerializer, AccessFailureLogsSerializer
from axes.models import AccessLog
from iam.auditing.models.custom_access_log_failure import AccessFailureLogModel
from iam.access_policy.authorization_policy import IsAuthenticatedAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication


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

        


