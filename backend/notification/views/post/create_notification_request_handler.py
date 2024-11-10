from rest_framework import generics, permissions, mixins
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from ...serializer.create_seriallizer.create_notification_serializer import CreateNotificationSerializer
# from notification.models.core_notification_model import WorkFlowNotification
from notification.models.core_notification_model import NotificationModel
 

class CreateNotificationRequestHandler(generics.GenericAPIView):
    queryset = NotificationModel.objects.all()
    serializer_class = CreateNotificationSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(notification_recepient=self.request.user)

    def perform_create(self, serializer):
        notification = serializer.save(notification_recepient=self.request.user)
        # send_notification.delay(notification.id)


