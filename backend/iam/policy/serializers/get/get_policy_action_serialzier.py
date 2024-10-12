from rest_framework import serializers
from ...models.actions_model import PolicyAction

class PolicyActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PolicyAction
        fields = [
            'policy_action_name'
        ]