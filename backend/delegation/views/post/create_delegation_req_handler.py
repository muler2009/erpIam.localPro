from django.db.models import Q
from rest_framework import generics, mixins, status, permissions
from rest_framework.request import Request
from rest_framework.response import Response
from utils.custom_exception_handler import CustomExceptionForError
from ...models.delegaiton_model import DelegationModel
from ...serializers.create.create_delegation_serializer import CreateDelegationSerializer

class CreateDelegationRequestHandler(generics.GenericAPIView, mixins.CreateModelMixin):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CreateDelegationSerializer

    def post(self, request: Request, *args, **kwargs):
        try:
            delegation_serializer = self.validate_request_data(request=request)
            self.check_delegation_role(request=request)
            self.save_delegation_instance(delegation_serializer)
        except CustomExceptionForError as exception:
            return Response({
                "message": str(exception.message),  # Ensure message is string
                "error_type": str(exception.error_type),  # Ensure error_type is string
                "status_code": exception.status_code
            }, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({
                'status_code': 201,
                'status_text': 'Delegation successful'
            }, status=status.HTTP_201_CREATED)

    # Validates the request data that will be posted
    def validate_request_data(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        if not serializer.is_valid():
            raise CustomExceptionForError(
                message=str(serializer.errors), error_type="ERROR", status_code=400
            )
        return serializer

    def check_delegation_role(self, request):
        user = request.user
        if not user.roles.filter(Q(role_name="deputy") | Q(role_name="vice")).exists():
            raise CustomExceptionForError(
                message="Delegation is not possible for associated user role",
                error_type="NOT ALLOWED"
            )
        return user

    def save_delegation_instance(self, serializer):
        delegation_instance = serializer.save()
        # Optionally return delegation_instance if further processing is required
        return delegation_instance