from rest_framework import generics, status, serializers, mixins
from easyaudit.models import LoginEvent
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework_simplejwt.authentication import JWTAuthentication
from iam.access_policy.authorization_policy import IsAuthenticatedAdminUser
from utils.exceptions.exception_classes import CustomExceptionForError
from ...audit_serializer.login_audit_serializer import LoginEventAuditLogSerialzier




class LoginEventAuditLogRequestHandler(generics.GenericAPIView, mixins.ListModelMixin):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticatedAdminUser]
    serializer_class = LoginEventAuditLogSerialzier
    queryset = LoginEvent.objects.all()

    def get(self, request:Request):
        try:
            data = self.get_queryset()
            if not data:
                raise CustomExceptionForError(message="Not Found", error_type="NOT_FOUND_ERROR")
            
            serialized_data = self.serializer_class(data, many=True)
            
        except CustomExceptionForError as exc:
            return Response({
                "message": exc.message,
                "error type": exc.error_type
            }, status=status.HTTP_204_NO_CONTENT)

        else: 
            return Response(serialized_data.data, status=status.HTTP_200_OK)



