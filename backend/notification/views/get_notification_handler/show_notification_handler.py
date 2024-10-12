from rest_framework import generics, permissions, authentication, status
from rest_framework_simplejwt import authentication
from rest_framework.response import Response
from ...models.core_notification_model import NotificationModel
from ...serializer.get_serializer.show_notification_serializer import ShowNotificationSerializer
from rest_framework.pagination import PageNumberPagination
from utils.custom_exception_handler import CustomExceptionForError

class NotificationPagination(PageNumberPagination):
    page_size = 5  # Default number of notifications per page
    page_size_query_param = 'limit'
    max_page_size = 10  # Maximum number of notifications per page

class ShowNotificationRequestHandler(generics.GenericAPIView):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ShowNotificationSerializer
    pagination_class = NotificationPagination
    
    def get(self, request, *args, **kwargs):
        user = request.user
        if not user:
            return Response({"error": "User not authenticated"}, status=401)
        
        try: 
            notifications =  NotificationModel.objects.filter(notification_recepient=user)
            if not notifications:
                raise CustomExceptionForError(message="No Associated request Found", error_type='ERROR')
            notifications =  NotificationModel.objects.filter(notification_recepient=user)
            paginator = self.pagination_class()
            paginated_notification = paginator.paginate_queryset(notifications, request)
            
            # Serialize the notifications
            serializer = self.serializer_class(paginated_notification, many=True)
            
            return Response(serializer.data)

        except CustomExceptionForError as exc:
            return Response({
                'Error': exc.message,
                'error_type': exc.error_type
            })
       
    



