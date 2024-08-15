from rest_framework import generics
from ..serializer.create_notification_serializer import CreateNotificationSeerializer
from ..models.workflow_notification import WorkFlowNotification

class CreateNotificationRequestHandler(generics.CreateAPIView):
    serializer_class = CreateNotificationSeerializer
    queryset = WorkFlowNotification