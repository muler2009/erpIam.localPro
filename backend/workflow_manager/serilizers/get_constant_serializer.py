from rest_framework import serializers
from workflow_manager.models.workflow_action_model import WorkFlowProtocolModel
from workflow_manager.models.workflow_transition_model import WorkFlowTransitionModel
from workflow_manager.models.workflow_action_model import WorkFlowActionsModel


class GetProtocolModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkFlowProtocolModel
        fields = '__all__'

class GetActionModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkFlowActionsModel
        fields = '__all__'

        

class GetTransitionModelSerializer(serializers.ModelSerializer):
    action_name = serializers.SerializerMethodField()
    protocol_name = serializers.SerializerMethodField()
    from_state = serializers.SerializerMethodField()
    to_state = serializers.SerializerMethodField()


    def get_action_name(self, obj):
        return obj.action_name.action_name
    
    def get_protocol_name(self, obj):
        return obj.protocol_name.protocol_name
    
    def get_from_state(self, obj):
        return obj.from_state.state_name
    
    def get_to_state(self, obj):
        return obj.to_state.state_name

    class Meta:
        model = WorkFlowTransitionModel
        fields = ['transition_id', 'transition_name', 'action_name', 'protocol_name', 'from_state', 'to_state']
        extra_kwargs = {
            'transition_id': {'read_only': True}
        }