from rest_framework import serializers
from workflow_manager.models.workflow_state_model import WorkFlowStateModel

class GetStateModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkFlowStateModel
        fields = '__all__'