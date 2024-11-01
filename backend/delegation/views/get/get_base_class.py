from django.db.models import Q
from rest_framework import generics, mixins, status
from rest_framework.response import Response
from ...models.delegaiton_model import DelegationModel
from ...serializers.get.get_delegation_serialzier import GetDelegationSerialzier
from utils.custom_exception_handler import CustomExceptionForError


class GetBaseDelegationRequestHandler(generics.GenericAPIView, mixins.ListModelMixin):
    queryset = DelegationModel.objects.all()
    serializer_class = GetDelegationSerialzier
    is_active = True  # Default to active delegations
    message = ""

    def get_queryset(self):
        data = super().get_queryset()
        return data.filter(Q(delegator=self.request.user) & Q(is_delegation_active=self.is_active))

    def handle_response(self):
        data = self.get_queryset()
        if not data:
            raise CustomExceptionForError(
                message=f"{self.message}" if self.is_active else "No Expired Delegation Available Yet",
                error_type="NOT_FOUND",
                status_code=404
            )
        serializer = self.serializer_class(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get(self, request, *args, **kwargs):
        try:
            return self.handle_response()
        except CustomExceptionForError as exc:
            return Response(
                {
                    'message': exc.message,
                    'error_type': exc.error_type,
                    'status_code': exc.status_code
                },
                status=status.HTTP_404_NOT_FOUND
            )
        

















class GetDelegationsRequestHandler(generics.GenericAPIView, mixins.ListModelMixin):
    queryset = DelegationModel.objects.all()
    serializer_class = GetDelegationSerialzier

    def get_queryset(self, request):
        data = super().get_queryset()
        return data.filter(
            Q(delegator=request.user) and Q(is_delegation_active=True)
        )

    def get(self, request, *args, **kwargs):
        try:
            data = self.get_queryset(request)
            if not data:
                raise CustomExceptionForError(message="No Delegation Available Yet", error_type="NOT_FOUND", status_code=404)
            model_level_serialzier = self.serializer_class(data, many=True)
            
            return Response(model_level_serialzier.data, status=status.HTTP_200_OK)

        except CustomExceptionForError as exc:
            return Response({
                'message': exc.message,
                'error_type': exc.error_type,
                'status_code': exc.status_code
            }, status=status.HTTP_404_NOT_FOUND)