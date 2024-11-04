from rest_framework import serializers
from ...models.delegaiton_model import DelegationModel
from iam.users.serializers.get_user_account_serializer import GetUserAccountSerializer

class GetDelegationSerialzier(serializers.ModelSerializer):
    delegatee_user = serializers.SerializerMethodField()
    delegation_duration = serializers.SerializerMethodField()
    delegator = serializers.SerializerMethodField()

    def get_delegator(self, obj):
        return f"{obj.delegator.first_name} {obj.delegator.last_name}"

    def get_delegatee_user(self, obj):
        return f"{obj.delegatee_user.first_name} {obj.delegatee_user.last_name}"
    
     # calculate the delegation duration
    def get_delegation_duration(self, obj):
        if obj.delegation_start_date and obj.delegation_end_date:
            duration = (obj.delegation_end_date - obj.delegation_start_date).days
            return duration
        return None


    class Meta:
        model = DelegationModel
        fields =[
            'delegation_id',
            'delegator',
            'delegatee_user',
            'delegation_start_date', 
            'delegation_end_date', 
            'is_delegation_active',
            'delegation_duration' 
        ]
       