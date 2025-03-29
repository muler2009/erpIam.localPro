from rest_framework import serializers
from easyaudit.models import LoginEvent
from iam.models import UserAccountsModel

class LoginEventAuditLogSerialzier(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField(method_name="get_full_name")

    def get_full_name(self, obj):
        user = UserAccountsModel.objects.filter(user_account_id=obj.user_id).first()
        if user:
            return f"{user.first_name} {user.last_name}"
        return None
    

    class Meta:
        model = LoginEvent
        fields = [
            "user_id",
            "username",
            "remote_ip",
            "datetime",
            "login_type",
            "full_name",
        ]