from rest_framework import generics, permissions, authentication, status
from rest_framework_simplejwt import authentication
from rest_framework.response import Response
from ..models.workflow_notification import WorkFlowNotification
from ..serializer.show_notification_serializer import ShowNotificationSerializer


class ShowNotificationRequestHandler(generics.GenericAPIView):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ShowNotificationSerializer
    
    def get(self, request, *args, **kwargs):
        user = request.user
        if not user:
            return Response({"error": "User not authenticated"}, status=401)
       
         # Filter notifications for the logged-in user
        notifications =  WorkFlowNotification.objects.filter(notification_recepient=user)
        
        # Serialize the notifications
        serializer = self.get_serializer(notifications, many=True)
        
        # Add additional information you want to send along with the notifications
        response_data = {
            "notifications": serializer.data,
            "total_unread": notifications.filter(notification_read=False).count(),  # Example of additional data
            "user": {
                "username": user.username,
                "email": user.email,
            },
            # Add more custom fields as needed
        }

        # Return the response with additional information
        return Response(response_data, status=status.HTTP_200_OK)



