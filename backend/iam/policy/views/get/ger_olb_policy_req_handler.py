from rest_framework import generics
from ...models.policy_model import OromiaLandPolicy
from ...serializers.get.get_oromia_land_policy_serializer import GetOLBPolicySerailzier

class GetAllOLBPolicyRequestHandler(generics.ListAPIView):
    queryset = OromiaLandPolicy.objects.all()
    serializer_class = GetOLBPolicySerailzier