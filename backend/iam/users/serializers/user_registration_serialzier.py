from rest_framework import serializers
from iam.models import UserAccountsModel
from iam.groups.models import PosixGroupUserModel


class UserRegistrationSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(max_length=68, min_length=8, write_only=True)
    class Meta:
        model = UserAccountsModel
        fields = ['username', 'email', 'password', 'first_name', 'last_name', 'confirm_password', 'group']
        extra_kwargs = {
            'user_account_id': {'read_only': True}, # exculde on deserialization
            'password': {'write_only': True} # exculde on serialization
        }

    def validate(self, attrs):
        password = attrs.get('password', '')
        confirm_password = attrs.get('confirm_password', '')
        email = attrs.get('email', '')
        username = attrs.get('username', '')

        if password != confirm_password:
            raise serializers.ValidationError("Passord must match")

        return attrs
    
    def create(self, validated_data):
        # Remove confirm_password from validated_data as it's not needed for user creation
        validated_data.pop('confirm_password')

        # Fetch the default group (e.g., "Client") from the POSIXGroup model
        default_group, created = PosixGroupUserModel.objects.get_or_create(group_name='client')

        # Create the user
        new_user = UserAccountsModel.objects.create_user(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            password=validated_data['password'],
            group=default_group  # Assign the default group during user creation
        )

        return new_user