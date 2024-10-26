from rest_framework import generics, status
from rest_framework.response import Response
from utils.custom_exception_handler import CustomExceptionForError
from iam.models import UserAccountsModel
from ...serializers.get_user_account_serializer import GetUserAccountSerializer


class GetDeactivatedAccountOnlyRequestHandler(generics.GenericAPIView):
    queryset = UserAccountsModel.objects.all()
    serializer_class = GetUserAccountSerializer

    
    def get_queryset(self):
        data = super().get_queryset()
        return data.filter(is_active=False)

    def get(self, request, *args, **kwargs):
        try:
            data = self.get_queryset()
            if not data:
                raise CustomExceptionForError(message="No Deactivated Account", error_type="NOT_FOUND", status_code=404)
            model_level_serialzier = self.serializer_class(data, many=True)
            
            return Response(model_level_serialzier.data, status=status.HTTP_200_OK)

        except CustomExceptionForError as exc:
            return Response({
                'message': exc.message,
                'error_type': exc.error_type,
                'status_code': exc.status_code
            }, status=status.HTTP_404_NOT_FOUND)




