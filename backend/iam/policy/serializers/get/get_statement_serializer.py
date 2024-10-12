from rest_framework import serializers
from ...models.statement_model import PolicyStatements
from .get_policy_action_serialzier import PolicyActionSerializer


class PolicyStatementSerializer(serializers.ModelSerializer):
    actions = serializers.SerializerMethodField()
    def get_actions(self, obj):
        return [action.policy_action_name for action in obj.actions.all()]

    class Meta:
        model = PolicyStatements
        fields = [
            # 'policy',
            'effect',
            'actions'
        ]