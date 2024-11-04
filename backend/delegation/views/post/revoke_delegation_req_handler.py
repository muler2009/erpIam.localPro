from rest_framework import status, generics
from rest_framework.request import Request
from rest_framework.response import Response
from utils.custom_exception_handler import CustomExceptionForError
from ...models.delegaiton_model import DelegationModel


class RevokeDelegationRequestHandler(generics.GenericAPIView):
    lookup_field = "delegation_id"

    def get_object(self):
        delegation_id = self.kwargs.get(self.lookup_field)
        instance = DelegationModel.objects.get(delegation_id=delegation_id)
        return instance
        
    def post(self, request:Request, *args, **kwargs):
        try: 
            revoked_instance = self.get_object()
            if not revoked_instance:
                raise CustomExceptionForError(message="No Delegation to revoke", error_type="NOT_FOUND", status=status.HTTP_404_NOT_FOUND)
            
            if not revoked_instance.is_delegation_active:
                raise CustomExceptionForError(message="Delegation already revoked", error_type="REVOKED")

            revoked_instance.is_delegation_active = False  # revoke the delegation status
            revoked_instance.save()

        except CustomExceptionForError as exc:
            return Response({
                "message": exc.message,
                "error_type": exc.error_type,
            }, status=status.HTTP_404_NOT_FOUND)
        
        else:
            return Response({
                "status_code": 202,
                "message": f"Delegation successfully revoked.",
            }, status=status.HTTP_202_ACCEPTED)
