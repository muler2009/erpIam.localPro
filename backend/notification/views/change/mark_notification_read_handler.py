from rest_framework import generics, status, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from notification.models.core_notification_model import NotificationModel
from notification.serializer.create_seriallizer.create_notification_serializer import CreateNotificationSerializer, UpdateNotificationSerializer
from django.shortcuts import get_object_or_404


class MarkNotificationAsReadRequestHandler(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    queryset = NotificationModel.objects.all()
    serializer_class = UpdateNotificationSerializer
    lookup_field = "notification_id"

    def patch(self, request, *args, **kwargs):
        notification = self.get_object()
        # Update only the notification_read field
        serializer = self.get_serializer(notification, data={'notification_read': True}, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'status': 'notification marked as read'}, status=status.HTTP_200_OK)

