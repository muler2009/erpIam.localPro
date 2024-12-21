from rest_framework import generics, serializers
from ...models.approval_process import ApprovalProcessModel


class GetApprovalProcessSerialzier(serializers.ModelSerializer):
    class Meta:
        model = ApprovalProcessModel
        fields = "__all__"

class GetApprovalProcess(generics.ListAPIView):
    queryset = ApprovalProcessModel.objects.all()
    serializer_class = GetApprovalProcessSerialzier