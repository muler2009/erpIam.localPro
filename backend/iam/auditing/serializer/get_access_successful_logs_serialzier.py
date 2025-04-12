from rest_framework import serializers
from ..models.custom_access_log_failure import AccessFailureLogModel
from axes.models import AccessLog
from iam.users.serializers.get_user_account_serializer import GetUserAccountSerializer
from iam.models import UserAccountsModel

class AccessSuccessfulLogsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccessLog
        fields = "__all__"

class AccessFailureLogsSerializer(serializers.ModelSerializer):
    full_user_name = serializers.SerializerMethodField()
    
    def get_full_user_name(self, obj):
        try:
            user = UserAccountsModel.objects.get(username=obj.username)
            return f"{user.first_name} {user.last_name}"
        except UserAccountsModel.DoesNotExist:
            return None

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
            'risk',
            'full_user_name'
        ]