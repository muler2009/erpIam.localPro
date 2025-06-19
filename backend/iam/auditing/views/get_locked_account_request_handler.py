from rest_framework import generics, mixins, status
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from iam.access_policy.authorization_policy import IsAuthenticatedAdminUser
from axes.models import AccessAttempt
from config.settings import axes
from ..serializer.get_locked_serializer import LockedAccountSerializer
from utils.custom_exception_handler import CustomExceptionForError


class LockedAccountsRequestHandler(generics.GenericAPIView, mixins.ListModelMixin):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticatedAdminUser]
    serializer_class = LockedAccountSerializer

    def get(self, request):
        try:
           locked_attempts = AccessAttempt.objects.filter(failures_since_start__gte=axes.AXES_FAILURE_LIMIT)
           serializer = self.serializer_class(locked_attempts, many=True)
           if not locked_attempts.exists():
                return Response({
                    "message": "No Locked Account",
                    "status_code": 204,
                    "error_type": "NOT_FOUND"
                }, status=status.HTTP_200_OK)
    
        except CustomExceptionForError as exception:
            return Response({
                "message": exception.message,
                "error_type": exception.error_type,
                "status_code": exception.status_code
            }, status=exception.status_code)

        return Response(serializer.data)
    





    # def get(self, request):
    #     locked_attempts = AccessAttempt.objects.filter(failures_since_start__gte=axes.AXES_FAILURE_LIMIT)
    #     result = []

    #     for attempt in locked_attempts:
    #         unlock_time = (
    #             attempt.attempt_time + axes.AXES_COOLOFF_TIME
    #             if axes.AXES_COOLOFF_TIME else None
    #         )
    #         remaining = max((unlock_time - now()).total_seconds(), 0) if unlock_time else None

    #         result.append({
    #             "username": attempt.username,
    #             "ip_address": attempt.ip_address,
    #             "failures": attempt.failures_since_start,
    #             "attempt_time": attempt.attempt_time,
    #             "unlock_time": unlock_time,
    #             "remaining_seconds": remaining,
    #         })

    #     return Response(result)