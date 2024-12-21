from rest_framework import status, generics
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from utils.custom_exception_handler import CustomExceptionForError
from ...models.saved_request import SavedRequestModel
from ...serializers.get.get_saved_request_serializer import GetSavedRequestSerialzier

'''
    Get-request handler for requests that the user created but not approved 
'''
class GetSavedRequestRequestHandler(generics.GenericAPIView):
    authentication_classes = [JWTAuthentication]
    serializer_class = GetSavedRequestSerialzier
    queryset = SavedRequestModel.objects.all()

    def get(self, request:Request, *args, **kwargs):
        user = request.user
        try: 
            unapproved_request = SavedRequestModel.objects.filter(request_send_by=user)
            if not unapproved_request:
                raise CustomExceptionForError(message="No Approved request Found", error_type='ERROR')
            unapproved_requests_seriallizer = self.serializer_class(unapproved_request, many=True, context={'request': request})
            return Response(unapproved_requests_seriallizer.data, status=status.HTTP_200_OK)

        except CustomExceptionForError as exc:
            # Catch the custom EmptyExceptionHandler and return a response with the error message
            return Response({
                'Error': exc.message,
                'error_type': exc.error_type
            }, status=status.HTTP_404_NOT_FOUND)  # You might want to return a 404 status here
        


