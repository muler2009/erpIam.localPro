from rest_framework import generics, permissions
from ...models.models import IamRoleModel
from ...serializers.get_role_serializers import GetIamRoleModelSerializer
from iam.permissions import EnforcePolicyPermisson, PolicyPermission

class GetSingleRoleRequestHandler(generics.RetrieveAPIView):
    queryset = IamRoleModel.objects.all()
    serializer_class = GetIamRoleModelSerializer
    permission_classes = [EnforcePolicyPermisson]
    lookup_field = 'role_id'