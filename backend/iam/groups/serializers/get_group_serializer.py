from rest_framework import serializers
from iam.groups.models import PosixGroupUserModel
from iam.users.serializers.get_user_account_serializer import GetUserAccountSerializer, GetUsernameSerializer

class GetGroupSerializer(serializers.ModelSerializer):
    members = GetUserAccountSerializer(many=True, read_only=True)
    # members = serializers.SerializerMethodField()
    class Meta:
        model = PosixGroupUserModel
        fields = ["group_id", "group_name", "group_posix_Id", "group_abbreviation", "group_description", 'members']

    def get_members(self, obj):
        return [user.username for user in obj.members.all()]