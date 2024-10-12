from rest_framework import serializers
from ...models.policy_model import PolicyModel
from .get_statement_serializer import PolicyStatementSerializer


class PolicySerializer(serializers.ModelSerializer):
    statements = PolicyStatementSerializer(many=True, read_only=True)
    class Meta:
        model = PolicyModel
        fields = [
            'policy_id',
            'policy_verison',
            'policy_name',
            'statements'
        ]




