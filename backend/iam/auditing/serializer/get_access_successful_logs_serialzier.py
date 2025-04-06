from rest_framework import serializers
from ..models.custom_access_log_failure import AccessFailureLogModel
from axes.models import AccessLog
from iam.users.serializers.get_user_account_serializer import GetUserAccountSerializer

class AccessSuccessfulLogsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccessLog
        fields = "__all__"

class AccessFailureLogsSerializer(serializers.ModelSerializer):
    # user_info = GetUserAccountSerializer()
    class Meta:
        model = AccessFailureLogModel
        fields = [
            'user_agent',
            'attempt_time',
            'ip_address',
            'username',
            'failure_count',
            'http_accept',
            'failure_reason',
            'user_info',
            'event',
            'risk'
        ]