from rest_framework import generics, status, permissions
from rest_framework.response import Response
from django.utils import timezone

class LastLoginTimeView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        # Get the user's last login time
        last_login = request.user.last_login

        if last_login:
            # Calculate time since last login
            time_since_last_login = timezone.now() - last_login
            # Format elapsed time in a readable way
            hours, remainder = divmod(time_since_last_login.total_seconds(), 3600)
            minutes, seconds = divmod(remainder, 60)
            elapsed_time_str = f"{int(hours)} hours, {int(minutes)} minutes, {int(seconds)} seconds"

            return Response({
                "last_login": last_login,
                "time_since_last_login": elapsed_time_str
            })

        # Handle case where last_login is None (if the user has never logged in)
        return Response({
            "message": "This is the user's first login."
        })