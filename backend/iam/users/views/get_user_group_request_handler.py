from rest_framework import generics, permissions
from rest_framework.request import Request
from rest_framework.response import Response


class GetUserGroupRequestHandler(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request:Request, *args, **kwargs):
        user = request.user
        groups = user.group.values_list('group_name', flat=True)
        return Response({"groups": groups})

