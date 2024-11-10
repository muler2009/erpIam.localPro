from rest_framework import serializers
from ...models.delegaiton_model import DelegationModel
from iam.models import UserAccountsModel
from django.utils import timezone
from utils.custom_exception_handler import CustomExceptionForError
from django.core.exceptions import ObjectDoesNotExist

class CreateDelegationSerializer(serializers.ModelSerializer):
    delegation_start_date = serializers.DateField(input_formats=["%Y-%m-%d"])
    delegation_end_date = serializers.DateField(input_formats=["%Y-%m-%d"])
    # delegatee_user = serializers.SerializerMethodField()
    delegatee_user = serializers.CharField(source='delegatee_user.full_name', read_only=True)

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
        # Ensure start date is before end date
        start_date = data.get("delegation_start_date")
        end_date = data.get("delegation_end_date")
        if start_date and end_date and start_date > end_date:
            raise serializers.ValidationError("Delegation start date must be before the end date.")

        # Check if user already has an active delegation
        if DelegationModel.objects.filter(delegator=self.context['request'].user, is_delegation_active=True).exists():
            raise serializers.ValidationError("You already have an active delegation. Revoke the existing delegation to assign a new one.")
        
        return data

    def create(self, validated_data):
        delegator = self.context['request'].user
        delegatee_full_name = self.context['request'].data.get('delegatee_user')
        
        if delegatee_full_name:
            names = delegatee_full_name.split()
            first_name = names[0]
            last_name = " ".join(names[1:]) if len(names) > 1 else ""
            
            # Retrieve the delegatee user based on name parts
            try:
                delegatee_user = UserAccountsModel.objects.get(first_name=first_name, last_name=last_name)
                validated_data['delegatee_user'] = delegatee_user
            except ObjectDoesNotExist:
                raise CustomExceptionForError(message="delegatee_user User with the provided name does not exist.", error_type="Not Found")
        else:
            raise serializers.ValidationError({"delegatee_user": "Delegatee full name is required."})

        # Create and return delegation instance
        delegation_instance = DelegationModel.objects.create(delegator=delegator, **validated_data)
        return delegation_instance
