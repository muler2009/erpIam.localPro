from rest_framework.permissions import BasePermission
from rest_framework.exceptions import PermissionDenied
from utils.permissions_exception_handler import DeletePermissionDenied
from rest_framework.response import Response


class IsOwnerOfRequestPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        if obj.requesting_user != request.user:
            raise PermissionDenied(detail="You don't have permission for this action")
        return True