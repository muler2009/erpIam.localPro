from rest_framework import serializers
from ...models.policy_mocel_modified import OromiaLandPolicy
import uuid

class PolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = OromiaLandPolicy
        fields = ['policy_ormomia_id', 'policy_name', 'description', 'version', 'statements_modifed']

        def create(self, validated_data):
            # Get the 'statements' from validated data
            statements_modifed = validated_data.get('statements', [])

            # Modify each statement to have a dynamic 'sid' if it doesn't exist
            for statement in statements_modifed:
                if 'sid' not in statement or not statement['sid']:
                    # Generate sid dynamically with 'pkk' and a unique UUID
                    statement['sid'] = f"{uuid.uuid4().hex[:8]}"  # pkk + first 8 chars of UUID
                    
            validated_data['statements'] = statements_modifed
            
            # Now call the default create method
            return super().create(validated_data)