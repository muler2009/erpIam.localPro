from rest_framework import serializers
from iam.models import UserAccountsModel

class AccountDeacticationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccountsModel
        fields = [
            'user_account_id', 
            'username', 
            'email', 
            'first_name', 
            'last_name', 
            'userId', 
            'home_directory', 
            'is_staff', 
            'account_created_at',
            'account_modified_at', 
            'is_staff',  
            'is_active',  
            'is_superuser'
            ]
        
        extra_kwargs = {
            'password': {'write_only': True} # exculde on serialization
        }

    
