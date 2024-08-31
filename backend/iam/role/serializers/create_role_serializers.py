from rest_framework import serializers
from iam.role.models.models import IamRoleModel
from iam.models import UserAccountsModel

class CreateIamRoleModelSerializer(serializers.ModelSerializer):
    users = serializers.SerializerMethodField() 
    class Meta:
        model = IamRoleModel
        fields = ['role_id', 'role_name', 'role_description', 'role_scope', 'role_created_at', 'role_modified_date', 'role_status', 'users']
        extra_kwargs = {
            'role_id': {'read_only': True},
            'role_created_at': {'read_only': True},
            'role_modified_date': {'read_only': True}
        }

       # To access the memebers in the list with the username 
    def get_users(self, obj):
        return [user.username for user in obj.users.all()] 
     
    def create(self, validated_data):
        users = validated_data.pop('users', [])
        role = IamRoleModel.objects.create(**validated_data)
        if users:
            role.users.set(users)
        role.save()
       
        return role

    

      

    # def update(self, instance, validated_data):
    #     users = validated_data.pop('users', [])
    #     instance.name = validated_data.get('name', instance.name)
    #     instance.description = validated_data.get('description', instance.description)
    #     instance.save()
    #     instance.users.set(users)
    #     return instance