from rest_framework import generics, status, mixins
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.request import Request
from rest_framework.response import Response
from utils.custom_exception_handler import CustomExceptionForError
from ...serializer.create_seriallizer.set_up_preference_serialzier import SetUpPreferenceSerializer
from ...models.notification_preference_model import NotificationPreferenceModel


class SetUpPreferenceRequestHandler(generics.GenericAPIView, mixins.CreateModelMixin):
    authentication_classes = [JWTAuthentication]
    serializer_class = SetUpPreferenceSerializer

    def post(self, request:Request, *args, **kwargs):
        try: 
            serialzier = self.validate_request_data(request=request)
            serialzier.save()
        except CustomExceptionForError as exc:
            return Response({
                'message': exc.message,
                'error_type': exc.error_type
            }, status=status.HTTP_400_BAD_REQUEST)
        
        else:
            return Response({
                "status_code": 201,
                "status_text": "Setup Successful"
            }, status=status.HTTP_201_CREATED)
        
    def validate_request_data(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        if not serializer.is_valid():
            raise CustomExceptionForError(
                message=str(serializer.errors), error_type="ERROR", status_code=400
            )
        return serializer
    



    



