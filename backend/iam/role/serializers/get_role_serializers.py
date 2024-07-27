from rest_framework import serializers
from iam.role.models.models import IamRoleModel


class GetIamRoleModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = IamRoleModel
        fields = ['role_id', 'role_name', 'role_description', 'role_scope', 'role_created_at', 'role_modified_date', 'role_status']
