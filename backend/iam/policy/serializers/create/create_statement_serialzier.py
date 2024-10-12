from rest_framework import serializers
from ...models.statement_model import PolicyStatements
from ...serializers.get.get_policy_action_serialzier import PolicyActionSerializer
from ...models.actions_model import PolicyAction

class CreateStatementSerializer(serializers.ModelSerializer):
    actions = PolicyActionSerializer(many=True)  # A statement has many actions

    class Meta:
        model = PolicyStatements
        fields = ['effect', 'actions']

    def create(self, validated_data):
        actions_data = validated_data.pop('actions')
        resources_data = validated_data.pop('resources')
        statement = PolicyStatements.objects.create(**validated_data)
        for action_data in actions_data:
            PolicyAction.objects.create(statement=statement, **action_data)
        return statement

