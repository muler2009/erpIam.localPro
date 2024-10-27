from rest_framework import serializers
from ...models.delegaiton_model import DelegationModel

class CreateDelegationSerializer(serializers.ModelSerializer):
    delegation_start_date = serializers.DateField(input_formats=["%Y-%m-%d"])
    delegation_end_date = serializers.DateField(input_formats=["%Y-%m-%d"])

    class Meta:
        model = DelegationModel
        fields =[
            'delegator', 
            'delegatee_user',
            'delegation_start_date', 
            'delegation_end_date', 
            'is_delegation_active' 
        ]
        extra_kwargs = {
            'delegator': {'read_only': True}, 
            'delegation_id': {'read_only': True} 
        }

    def create(self, validated_data):
        delegator = self.context['request'].user
        delegation_instance = DelegationModel.objects.create(delegator=delegator, **validated_data)
        return delegation_instance

