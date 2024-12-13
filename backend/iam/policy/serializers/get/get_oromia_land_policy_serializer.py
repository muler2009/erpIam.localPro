from rest_framework import serializers
from ...models.policy_model import OromiaLandPolicy

class GetOLBPolicySerailzier(serializers.ModelSerializer):
    class Meta:
        model = OromiaLandPolicy
        fields = [
            'policy_ormomia_id', 
            'policy_name', 
            'policy_description', 
            'policy_version', 
            'statements',
            'is_app_level',
            'is_model_level'
        ]

