from rest_framework import serializers
from groups.models import PosixGroupUserModel
from utils.custom_exception_handler import CustomExceptionHandler
import re
from users.models import UserAccountsModel
from users.serializers.create_user_account_serializer import CreateLDAPUserSerializer

class CreateGroupSerializer(serializers.ModelSerializer):
    group_posix_Id = serializers.IntegerField(required=False)
    members = serializers.PrimaryKeyRelatedField(
        queryset=UserAccountsModel.objects.all(),
        many=True,
        required=False
    )
  
    
    class Meta:
        model = PosixGroupUserModel
        fields = ["group_name", "group_posix_Id", "group_abbreviation", "group_description", "members"]
        extra_kwargs = {
            'group_id': {'read_only': True},
        } 
        
    def validate_group_posix_Id(self, value):
        existing_group = PosixGroupUserModel.objects.filter(group_posix_Id=value).exists()
        if value is None and PosixGroupUserModel.objects.exists():
            raise serializers.ValidationError("group_posix_Id is required for subsequent groups")
        elif existing_group:
            raise serializers.ValidationError("Group_Exists")
        elif not isinstance(value, int):
            raise serializers.ValidationError("GID_must_be_positive")   
        
        return value
        
    def validate(self, attrs):
        validation_errors_dict = {}
        
        abbreviation_prefix = attrs.get('group_name')[:2].upper()
        pattern = r'^{}[0-9]+$'.format(re.escape(abbreviation_prefix))
                    
        if not re.match(pattern, attrs.get('group_abbreviation')):
            validation_errors_dict['group_abbreviation'] = "group_abbreviation must start with the first two letters of group_name followed by a number."
        
        if validation_errors_dict:
            raise serializers.ValidationError(validation_errors_dict)
        
        return attrs
       
    def create(self, validated_data):
        members = validated_data.pop('members', [])
        group_posix_Id = validated_data.get('group_posix_Id')

        if group_posix_Id is None:
            get_highest_group_posix = PosixGroupUserModel.objects.order_by('-group_posix_Id').first()
            if get_highest_group_posix:
                group_posix_Id = get_highest_group_posix.group_posix_Id + 1
            else:
                group_posix_Id = 500
            
            validated_data['group_posix_Id'] = group_posix_Id
            
        group = PosixGroupUserModel.objects.create(**validated_data)
        if members:
            group.members.set(members)
        group.save()
       
        return group
       