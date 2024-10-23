from rest_framework import serializers
from ...models.policy_mocel_modified import OromiaLandPolicy
import uuid
from utils.custom_exception_handler import CustomExceptionForError

class PolicySerializer(serializers.ModelSerializer):

    class Meta:
        model = OromiaLandPolicy
        fields = ['policy_ormomia_id', 'policy_name', 'policy_description', 'policy_version', 'statements', 'is_app_level', 'is_model_level']

    def validate(self, data):
        """
        Custom validation for empty values and data types.
        """
        errors = {}

        # Check for empty 'policy_name' field
        if not data.get('policy_name'):
            errors['policy_name'] = "Policy name is a required field."

        # Check for empty 'policy_description' field
        if not data.get('policy_description'):
            errors['policy_description'] = "Policy description is a required field."

        # Validate 'statements' field
        statements = data.get('statements', [])
        if not isinstance(statements, list) or len(statements) == 0:
            errors['statements'] = "Statements must be a non-empty list."

        # Check each statement for necessary fields
        for i, statement in enumerate(statements):
            if 'effect' not in statement or not statement['effect']:
                errors[f'statements[{i}].effect'] = "Effect is required for each statement."
            if 'action' not in statement or not isinstance(statement['action'], list) or len(statement['action']) == 0:
                errors[f'statements[{i}].action'] = "Action must be a non-empty list in each statement."
            if 'resource' not in statement or not isinstance(statement['resource'], list) or len(statement['resource']) == 0:
                errors[f'statements[{i}].resource'] = "Resource must be a non-empty list in each statement."

        if errors:
            raise serializers.ValidationError(errors)

        return data

    def create(self, validated_data):
        """
        Customize the create method to handle 'statements' field and generate dynamic 'sid'.
        """
        # Get the 'statements' from validated data
        statements_modifed = validated_data.get('statements', [])

        # Modify each statement to have a dynamic 'sid' if it doesn't exist
        for statement in statements_modifed:
            if 'sid' not in statement or not statement['sid']:
                # Generate sid dynamically with a unique UUID
                statement['sid'] = f"{uuid.uuid4().hex[:8]}"  # First 8 chars of UUID
                
        validated_data['statements'] = statements_modifed
        
        # Now call the default create method
        return super().create(validated_data)
