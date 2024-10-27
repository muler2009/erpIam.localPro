from rest_framework import serializers
from ...models.delegaiton_model import DelegationModel
from iam.users.serializers.get_user_account_serializer import GetUserAccountSerializer

class GetDelegationSerialzier(serializers.ModelSerializer):
    delegatee_user = serializers.SerializerMethodField()

    def get_delegatee_user(self, obj):
        return f"{obj.delegatee_user.first_name} {obj.delegatee_user.last_name}"


    class Meta:
        model = DelegationModel
        fields =[
            'delegation_id',
            'delegatee_user',
            'delegation_start_date', 
            'delegation_end_date', 
            'is_delegation_active' 
        ]
       