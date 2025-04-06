from django.dispatch import receiver
from axes.signals import user_locked_out
from utils.exceptions.exception_classes import CustomExceptionForError
from rest_framework.response import Response
from rest_framework import status

@receiver(user_locked_out)
def user_locked_out_permission_denied_handler(sender, request, username, ip_address, **kwargs):
    # request.lockout_response = Response ({
    #     "error": "too many attemps",
    #     "type": "from axes"
    # }, status=status.HTTP_403_FORBIDDEN)

    request.session["lockout_message"] = "Too many attemps"