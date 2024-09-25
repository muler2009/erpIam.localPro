from rest_framework import generics, status, serializers
from rest_framework.response import Response
from rest_framework.request import Request
from utils.custom_exception_handler import PostExceptionHandler
from ...serializers.user_registration_serialzier import UserRegistrationSerializer



class RegisterViewRequestHandler(generics.GenericAPIView):
    serializer_class = UserRegistrationSerializer

    def post(self, request: Request):
        try: 
            user_registration_data = request.data
            user_serialzier = self.serializer_class(data=user_registration_data)
            if not user_serialzier.is_valid(raise_exception=True):
                raise PostExceptionHandler(message="Not valid data", error_type="ERROR")
            
            user_serialzier.save()

        except serializers.ValidationError as validation_error:
            raise PostExceptionHandler(message=str(validation_error), error_type="VALIDATION_ERROR", status_code=401)
            
        except PostExceptionHandler as exception: 
            return Response({
                "message": exception.message,
                "error_type": exception.error_type,
                "status_code": exception.status_code
            })

        else:
            return Response({
                'status_code': 201,
                "statusText": 'created successfully',
                'data': user_serialzier.data

            })