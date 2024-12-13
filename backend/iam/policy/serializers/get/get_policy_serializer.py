from rest_framework import serializers
from ...models.policy_model import OromiaLandPolicy
from .get_statement_serializer import PolicyStatementSerializer


class PolicySerializer(serializers.ModelSerializer):
    # statements = PolicyStatementSerializer(many=True, read_only=True)
    class Meta:
        model = OromiaLandPolicy
        fields = [
            'policy_oromia_id',
            'policy_verison',
            'policy_description',
            'policy_name',
            'statements'
        ]




