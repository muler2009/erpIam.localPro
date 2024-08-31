from rest_framework import serializers
from workflow_manager.models.request_model import ApprovedRequestByRequestOwnerModel
from workflow_manager.models.approval_level import ApprovalStageModel

class GetApprovalStageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApprovalStageModel
        fields = '__all__'

