from rest_framework import generics, status
from ...models.policy_model import PolicyModel
from ...serializers.get.get_policy_serializer import PolicySerializer

class GetAllPolicyRequestHandler(generics.ListAPIView):
    queryset = PolicyModel.objects.all()
    serializer_class=PolicySerializer
