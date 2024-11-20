from rest_framework import generics, mixins, status
from rest_framework.request import Request
from rest_framework.response import Response
from utils.custom_exception_handler import CustomExceptionForError
from ...models.notification_event_type import NotificationEventTypeModel
from ...serializer.get_serializer.event_type_serializer import NotificationTemplateSerializer 


class GetNotificationTemplateRequestHndler(generics.GenericAPIView, mixins.ListModelMixin):
    serializer_class = NotificationTemplateSerializer
    queryset = NotificationEventTypeModel.objects.all()

    def get(self, request:Request):
        try:

            data = self.get_queryset()
            if not data:
                raise CustomExceptionForError(message="Template not found", error_type="EMPTY")
            template_serializer = self.serializer_class(data, many=True)
        
        except CustomExceptionForError as exc:
            return Response({
                "message": exc.message,
                "error_type": exc.error_type,
                "status_code": exc.status_code
            },status=status.HTTP_404_NOT_FOUND )
        
        else:
            return Response(template_serializer.data, status=status.HTTP_200_OK)
