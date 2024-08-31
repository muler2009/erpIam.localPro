from rest_framework import serializers
from iam.role.models.models import IamRoleModel
from iam.models import UserAccountsModel
from iam.users.serializers.get_user_account_serializer import GetUserAccountSerializer

class GetIamRoleModelSerializer(serializers.ModelSerializer):
    # users = GetUserAccountSerializer(many=True, read_only=True)
    users = serializers.SlugRelatedField(many=True, queryset=UserAccountsModel.objects.all(), slug_field='username')
    
    class Meta:
        model = IamRoleModel
        fields = [
            'role_id', 
            'role_name', 
            'role_description', 
            'role_scope', 
            'role_created_at', 
            'role_modified_date', 
            'role_status', 
            'users'
        ]

    def get_users(self, obj):
        return [user.username for user in obj.users.all()]
