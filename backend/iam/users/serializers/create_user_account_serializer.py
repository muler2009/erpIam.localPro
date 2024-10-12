from rest_framework import serializers
from iam.models import UserAccountsModel
from rest_framework.validators import UniqueValidator
from rest_framework.exceptions import ValidationError 
from rest_framework.response import Response
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from utils.set_default_password import set_default_password
from iam.groups.models import PosixGroupUserModel
from django.core.exceptions import ObjectDoesNotExist
from iam.groups.serializers.get_group_serializer import GetGroupSerializer


class UsernameAndEmailUniqueValidator(UniqueValidator):
    def __init__(self, queryset, message=None, lookup='exact'):
        super().__init__(queryset, message, lookup)  
        
    def __call__(self, value, serializer_field):
        
        queryset = self.queryset.filter(**{serializer_field.field_name: value})      
        if queryset.exists():
            raise ValidationError(str(self.message))
        
        return super().__call__(value, serializer_field)        
        

class CreateLDAPUserSerializer(serializers.ModelSerializer):  
    is_staff = serializers.BooleanField()
    group = serializers.PrimaryKeyRelatedField(queryset=PosixGroupUserModel.objects.all(), required=False)
    
    class Meta:
        model = UserAccountsModel
        fields = ['username', 'email', 'password', 'first_name', 'last_name', 'is_staff', 'group']
        extra_kwargs = {
            'user_account_id': {'read_only': True}, # exculde on deserialization
            'password': {'write_only': True} # exculde on serialization
        }
    
    def validate(self, data):
        group = data.get('group')
        group_name = data.get('group_name')

        if group_name and not group:
            try:
                data['group'] = PosixGroupUserModel.objects.get(group_name=group_name)
            except ObjectDoesNotExist:
                raise serializers.ValidationError({"group_name": f"Group with name '{group_name}' does not exist."})
        
        return data
                  
    def validate_empty_values(self, data):
        """
            validation for empty values and raise the validation error for serilizer 
        """
        error_dict = {}
        
        for key, value in self.fields.items():
            validate_data = data.get(key, "")
            if not validate_data:
                model_field = self.Meta.model._meta.get_field(key)
                if not model_field.blank:
                    error_dict[key] = f"{key} is Required Field"
                    break
            elif key == 'password':
                if validate_data == "":
                    data[key] = set_default_password()
            elif not isinstance(validate_data, (str, bool)):
                error_dict[key] = f"{key} must be type {value.__class__.__name__}"
                break
                
        if error_dict:
            raise serializers.ValidationError(error_dict)       
        return super().validate_empty_values(data)
    
    
    def validate_password(self, password):
        """
            Password validation against AUTH_PASSWORD_VALIDATOR rule defined in django
        """
        try:
            if not password:
                password = set_default_password()
            else:
                validate_password(password=password)
        except ValidationError as exc:
            raise serializers.ValidationError(str(exc))

        return password   
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = UserAccountsModel(**validated_data)
        if password:
            user.set_password(password)
        else:
            user.set_password(set_default_password())
        # user.set_password(password)  # This will set the plain password and hash it
        print(f"Plain password in serializer: {user._plain_password}")

        user.save()
        return user
    

