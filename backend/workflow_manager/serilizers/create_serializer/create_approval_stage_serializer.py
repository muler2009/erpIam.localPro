from rest_framework import serializers
from workflow_manager.models.request_model import ApprovedRequestByRequestOwnerModel
from workflow_manager.models.approval_level import ApprovalStageModel


class CreateApprovalStageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApprovalStageModel
        fields = ['request', 'stage_name', 'role', 'transition', 'comments', 'approved_at', 'created_at']
        extra_kwargs = {
            'approval_stage_id': {'read_only': True},
            'approved_at': {'read_only': True},
            'created_at': {'read_only': True}
        }

    def create(self, validated_data):
        approval_stage = ApprovalStageModel.objects.create(**validated_data)
        return approval_stage