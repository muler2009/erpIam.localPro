from rest_framework import generics
from workflow_manager.models.approval_level import ApprovalStageModel
from workflow_manager.serilizers.get_approval_stage_serializer import GetApprovalStageSerializer

class GetApprovalStageRequestHander(generics.ListAPIView):
    queryset = ApprovalStageModel.objects.all()
    serializer_class = GetApprovalStageSerializer