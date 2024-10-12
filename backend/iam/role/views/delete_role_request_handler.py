from rest_framework import generics, status
from rest_framework.response import Response
from iam.role.models.models import IamRoleModel
from django.shortcuts import get_object_or_404
from utils.custom_exception_handler import CustomExceptionForError


class DeleteIamModelInstanceRequestHandler(generics.GenericAPIView):
    lookup_field = "role_id"
    
    def get_object(self):
        role_id = self.kwargs.get(self.lookup_field)
        instance_to_delete = IamRoleModel.objects.get(pk=role_id)
        return instance_to_delete
    
    def delete(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            instance.delete()
        except IamRoleModel.DoesNotExist:
            return Response({'Error_message': 'Role Instance Not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        else:
            return Response({
                "status_code": 204,
                "status_text": "Role Instance Successfully Deleted"
            }, status=status.HTTP_204_NO_CONTENT)
        
