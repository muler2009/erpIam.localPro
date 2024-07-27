from rest_framework import serializers
from iam.role.models.models import IamRoleModel

class CreateIamRoleModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = IamRoleModel
        fields = ['role_id', 'role_name', 'role_description', 'role_scope', 'role_created_at', 'role_modified_date', 'role_status']
        extra_kwargs = {
            'role_id': {'read_only': True},
            'role_created_at': {'read_only': True},
            'role_modified_date': {'read_only': True}
        }

    def create(self, validated_data):
        role = IamRoleModel.objects.create(**validated_data)
        return role