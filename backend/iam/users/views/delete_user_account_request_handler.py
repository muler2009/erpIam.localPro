from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from iam.models import UserAccountsModel
from utils.custom_exception_handler import CustomExceptionForError
from ...access_policy.authorization_policy import IsAuthenticatedAdminUser


class DeleteUserAccountRequestHandler(generics.RetrieveDestroyAPIView):
    queryset = UserAccountsModel.objects.all()
    lookup_field = "user_account_id"
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticatedAdminUser]

    def get_object(self):
        user_account_id = self.kwargs.get(self.lookup_field)
        try:
            return UserAccountsModel.objects.get(pk=user_account_id)
        except UserAccountsModel.DoesNotExist:
            return None
                
    def destroy(self, request, *args, **kwargs):
        try:
            instance_deleted = self.get_object()    
            if instance_deleted is None:
                raise CustomExceptionForError(message="Data not found", error_type="NOT_FOUND")
            self.perform_destroy(instance_deleted)   
            return Response({'message': "Successfully deleted"}, status=status.HTTP_204_NO_CONTENT)

        except CustomExceptionForError as exc:
            return Response({
                "message": exc.detail.get('message'),
                "error_type": exc.detail.get('error_type')
            }, status=exc.status_code)
        
        except Exception as exc:
            return Response({
                "message": str(exc),
                "error_type": "INTERNAL_ERROR"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            
    def perform_destroy(self, instance):
        instance.delete()