from rest_framework import serializers
from ...models.delegaiton_model import DelegationModel
from iam.models import UserAccountsModel
from django.utils import timezone

class CreateDelegationSerializer(serializers.ModelSerializer):
    delegation_start_date = serializers.DateField(input_formats=["%Y-%m-%d"])
    delegation_end_date = serializers.DateField(input_formats=["%Y-%m-%d"])
    delegatee_user = serializers.SerializerMethodField()
    

    
    class Meta:
        model = DelegationModel
        fields = [
            'delegator', 
            'delegatee_user',
            'delegation_start_date', 
            'delegation_end_date', 
            'is_delegation_active',
           
        ]
        extra_kwargs = {
            'delegator': {'read_only': True}, 
            'delegation_id': {'read_only': True} 
        }

    def get_delegatee_user(self, obj):
        # Return full name as a single string
        if obj.delegatee_user:
            return f"{obj.delegatee_user.first_name} {obj.delegatee_user.last_name}"
        
        return None

    def validate(self, data):
        # Check that delegation start date is before end date
        start_date = data.get("delegation_start_date")
        end_date = data.get("delegation_end_date")
        if start_date and end_date and start_date > end_date:
            raise serializers.ValidationError("Delegation start date must be before the end date.")
        
        # Check if the user already has an active delegation
        if DelegationModel.objects.filter(delegator=self.context['request'].user, is_delegation_active=True).exists():
            raise serializers.ValidationError("You already has an active delegation. Revoke the existing to delegate another staff!")
        
        return data

    def create(self, validated_data):
        delegator = self.context['request'].user
        # Extract the delegatee full name from the request data
        delegatee_full_name = self.context['request'].data.get('delegatee_user')
        
        if delegatee_full_name:
            # Split the full name into first and last names
            names = delegatee_full_name.split()
            first_name = names[0]
            last_name = " ".join(names[1:]) if len(names) > 1 else ""
            
            # Attempt to retrieve the User instance based on the provided name
            try:
                delegatee_user = UserAccountsModel.objects.get(first_name=first_name, last_name=last_name)
                validated_data['delegatee_user'] = delegatee_user
            except UserAccountsModel.DoesNotExist:
                raise serializers.ValidationError({"delegatee_user": "User with th"})
        delegation_instance = DelegationModel.objects.create(delegator=delegator, **validated_data)
        return delegation_instance

