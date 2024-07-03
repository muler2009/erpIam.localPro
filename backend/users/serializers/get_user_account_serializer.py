from rest_framework import serializers
from users.models import UserAccountsModel


class GetUserAccountSerializer(serializers.ModelSerializer):
    group = serializers.SerializerMethodField()   

    class Meta:
        model = UserAccountsModel
        fields = [
            'user_account_id', 
            'username', 
            'email', 
            'password', 
            'first_name', 
            'last_name', 
            'userId', 
            'home_directory', 
            'is_staff', 
            'group',
            'account_created_at',
            'account_modified_at', 
            'is_staff',  
            'is_active',  
            'is_superuser'
            ]
        extra_kwargs = {
            'password': {'write_only': True} # exculde on serialization
        }

    def get_group(self, obj):
        return obj.group.group_name if obj.group else "Not Assigned"
        
class GetUsernameSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccountsModel
        fields = ['username']