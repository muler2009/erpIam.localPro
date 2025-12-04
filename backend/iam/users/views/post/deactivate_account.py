from rest_framework import generics, status, mixins
from rest_framework.response import Response
from utils.custom_exception_handler import CustomExceptionForError
from iam.models import UserAccountsModel
from ...serializers.deactivation_serialzier import AccountDeacticationSerializer
from ....access_policy.authorization_policy import IsAuthenticatedAdminUser


class AccountDeactivationRequestHandler(generics.GenericAPIView):
    # permission_classes = [IsAuthenticatedAdminUser]
    lookup_field = "user_account_id"

    def get_object(self):
        user_account_id = self.kwargs.get(self.lookup_field)
        instance = UserAccountsModel.objects.get(user_account_id=user_account_id)
        return instance
        
    def post(self, request, *args, **kwargs):
        try: 
            user = self.get_object()
            if not user:
                raise CustomExceptionForError(message="No Account Found with this ID", error_type="NOT_FOUND", status=status.HTTP_404_NOT_FOUND)
            
            user.is_active = not user.is_active  # Toggle the is_active status
            user.save()
            status_message = "activated" if user.is_active else "deactivated"

            return Response({
                "status_code": 201,
                "message": f"User has been successfully {status_message}.",
                "is_active": user.is_active
            }, status=status.HTTP_200_OK)
        
        except CustomExceptionForError as exc:
            return Response({
                "message": exc.message,
                "error_type": exc.error_type,
            }, status=status.HTTP_404_NOT_FOUND)

