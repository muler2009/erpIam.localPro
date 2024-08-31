from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from ...serializer.create_seriallizer.create_notification_serializer import CreateNotificationSerializer
# from notification.models.core_notification_model import WorkFlowNotification
from notification.models.core_notification_model import NotificationModel

class CreateNotificationRequestHandler(generics.CreateAPIView):
    serializer_class = CreateNotificationSerializer
    queryset = NotificationModel.objects.all()

    # def perform_create(self, serializer):
    #     notification = serializer.save()
    #     # Trigger the actual sending of the notification (email/SMS/in-app)
    #     notification.send_notification()


