from rest_framework import generics, permissions
from ...models.models import IamRoleModel
from ...serializers.get_role_serializers import GetIamRoleModelSerializer

class GetSingleRoleRequestHandler(generics.RetrieveAPIView):
    queryset = IamRoleModel.objects.all()
    serializer_class = GetIamRoleModelSerializer
    lookup_field = 'role_id'