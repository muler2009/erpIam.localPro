from rest_framework import serializers
from iam.models import UserAccountsModel
from axes.handlers.proxy import AxesProxyHandler
from utils.custom_exception_handler import CustomExceptionForError

class ManualUnlockSerializer(serializers.Serializer):
    username = serializers.CharField(required=True, allow_blank=True)
    ip_address = serializers.IPAddressField(required=False)

    def validate(self, attrs):
        username = attrs.get("username")
        ip_address = attrs.get("ip_address")

         # If username is provided, validate existence first
        if username:
            try:
                UserAccountsModel.objects.get(username=username)
            except UserAccountsModel.DoesNotExist:
                raise serializers.ValidationError({"username": "This user does not exist."})

        # Check if account is locked
        is_locked = AxesProxyHandler.is_locked(self.context["request"], credentials={"username": username})
        if not is_locked:
            raise CustomExceptionForError(
                error_type = "NOT_LOCKED",
                message= "The user is not currently locked.",
                status_code = 402
            )

        return attrs