from rest_framework import generics, permissions, authentication, status, mixins
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from rest_framework.request import Request
from ...models.core_notification_model import NotificationModel
from ...serializer.get_serializer.show_notification_serializer import ShowNotificationSerializer
from rest_framework.pagination import PageNumberPagination
from utils.custom_exception_handler import CustomExceptionForError


class ShowNotificationRequestHandler(generics.GenericAPIView, mixins.ListModelMixin):
    queryset = NotificationModel.objects.all()
    serializer_class = ShowNotificationSerializer
    authentication_classes = [JWTAuthentication]

    def get(self, request: Request):
        try: 
            user = self.get_requesting_user(request)
            notifications =  self.get_notification(user)
            notification_serializer = self.serializer_class(notifications, many=True)

        except CustomExceptionForError as exc:
            return Response({
                "message": exc.message,
                "error_type": exc.error_type,
                "status_code": exc.status_code
            },status=status.HTTP_404_NOT_FOUND )
        
        else:
            return Response(notification_serializer.data, status=status.HTTP_200_OK)

    def get_requesting_user(self, request):
        user = request.user
        if not user:
            raise CustomExceptionForError(message="Not allowed to see notification", error_type="NOT ALLOWED")
        return user
    
    def get_notification(self, user):
        notifications =  NotificationModel.objects.filter(notification_recepient=user)
        if not notifications:
            raise CustomExceptionForError(message="No Associated Notification Found", error_type='ERROR')

        return notifications

