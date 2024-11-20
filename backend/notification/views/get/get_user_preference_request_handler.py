from rest_framework import generics, mixins, status
from rest_framework.request import Request
from rest_framework.response import Response
from utils.custom_exception_handler import CustomExceptionForError
from ...models.notification_preference_model import NotificationPreferenceModel
from ...serializer.get_serializer.get_user_preference import NotificationPreferenceSerialzier 


class GetNotificationPreferenceRequestHandler(generics.GenericAPIView, mixins.ListModelMixin):
    serializer_class = NotificationPreferenceSerialzier
    queryset = NotificationPreferenceModel.objects.all()

    def get_queryset(self):
        data = super().get_queryset()
        return data.filter(user=self.request.user)

    def get(self, request, *args, **kwargs):
        try:
            data = self.get_queryset()
            if not data:
                raise CustomExceptionForError(message="No preferernce ", error_type="NOT_FOUND", status_code=404)
            model_level_serialzier = self.serializer_class(data, many=True)
            
            return Response(model_level_serialzier.data, status=status.HTTP_200_OK)

        except CustomExceptionForError as exc:
            return Response({
                'message': exc.message,
                'error_type': exc.error_type,
                'status_code': exc.status_code
            }, status=status.HTTP_404_NOT_FOUND)