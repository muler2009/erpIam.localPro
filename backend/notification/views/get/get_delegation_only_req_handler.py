from rest_framework import generics, mixins, status, permissions
from rest_framework.response import Response
from rest_framework.request import Request
from utils.custom_exception_handler import CustomExceptionForError
from ...models.notification_event_type import NotificationEventTypeModel
from ...models.core_notification_model import NotificationModel
from ...serializer.get_serializer.show_notification_serializer import ShowNotificationSerializer

class GetDelegationNotificationRequestHandler(generics.GenericAPIView, mixins.ListModelMixin):
    serializer_class = ShowNotificationSerializer
    queryset = NotificationModel.objects.all()

    def get(self, request:Request, *args, **kwargs):
        try:
            template_instance = self.get_event_type()
            notifications = self.get_notification_instance(request, template_instance)
            serialzier = self.serializer_class(notifications, many=True, context={"request": request})

        except CustomExceptionForError as exc:
            return Response({
                "message": exc.message,
                "error_type": exc.error_type
            }, status=status.HTTP_400_BAD_REQUEST)
        
        else:
            return Response(serialzier.data, status=status.HTTP_200_OK)

    def get_event_type(self):
        delegation_event_type = NotificationEventTypeModel.objects.get(eventType_name="delegation_request")
        if not delegation_event_type:
            raise CustomExceptionForError(message="There is no associated Event", error_type="NO_EVENT")
        return delegation_event_type
    
    def get_notification_instance(self, request, template_instance):
        notifications = NotificationModel.objects.filter(
            notification_recepient=request.user,
            notification_template=template_instance,
        )

        if not notifications:
            raise CustomExceptionForError(message="No Delegation instance", error_type="NO_DELEGATION")
        
        return notifications
