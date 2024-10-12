from rest_framework import serializers
from ...models.statement_model import PolicyStatements
from ...models.actions_model import PolicyAction
from ...models.policy_model import PolicyModel
from ...serializers.get.get_statement_serializer import PolicyStatementSerializer

class CreatePolicySerializer(serializers.ModelSerializer):
    statements = PolicyStatementSerializer(many=True)  # A policy has many statements

    class Meta:
        model = PolicyModel
        fields = ['version', 'statements']

    def create(self, validated_data):
        statements_data = validated_data.pop('statements')
        policy = PolicyModel.objects.create(**validated_data)
        for statement_data in statements_data:
            actions_data = statement_data.pop('actions')
            resources_data = statement_data.pop('resources')
            statement = PolicyStatements.objects.create(policy=policy, **statement_data)
            for action_data in actions_data:
                PolicyAction.objects.create(statement=statement, **action_data)
            
        return policy
