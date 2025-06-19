from rest_framework import serializers
from axes.models import AccessAttempt
from config.settings import axes
from django.utils.timezone import now
from iam.models import UserAccountsModel


class LockedAccountSerializer(serializers.ModelSerializer):
    unlock_time = serializers.SerializerMethodField()
    remaining_seconds = serializers.SerializerMethodField()
    full_user_name = serializers.SerializerMethodField()

    class Meta:
        model = AccessAttempt
        fields = (
            "username",
            "ip_address",
            "failures_since_start",
            "attempt_time",
            "unlock_time",
            "remaining_seconds",
            "full_user_name"
        )

    def get_full_user_name(self, obj):
        try:
            user = UserAccountsModel.objects.get(username=obj.username)
            return f"{user.first_name} {user.last_name}"     
        except UserAccountsModel.DoesNotExist:
            return None

    def get_unlock_time(self, obj):
        if axes.AXES_COOLOFF_TIME: # get the cooloff time 
            return obj.attempt_time + axes.AXES_COOLOFF_TIME # add the attempt_time with cooloff time to get unlock time
        return None

    def get_remaining_seconds(self, obj):
        unlock_time = self.get_unlock_time(obj)
        remaining_seconds = max((unlock_time - now()).total_seconds(), 0) # calculate the total second
        minutes = int(remaining_seconds // 60) # calculate the min
        seconds = int(remaining_seconds % 60) # calculte the sed
        if unlock_time:
            return f"{minutes} min {seconds} sec"
        return None