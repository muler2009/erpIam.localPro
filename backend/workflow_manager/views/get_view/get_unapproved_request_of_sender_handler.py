from rest_framework import generics, status, permissions
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.authentication import JWTAuthentication
from ...models.request_model import UnApprovedRequestByOwnerModel
from ...serilizers.get_request_serializer import GetUnapprovedRequestModelSerializer
from rest_framework.request import Request
from rest_framework.response import Response
from utils.custom_exception_handler import CustomExceptionForError
import uuid
from ...models.workflow_state_model import WorkFlowStateModel
from ...serilizers.send_request_serializer import UnApprovedRequestSerializer



class GetUnapprovedRequestOfSender(generics.GenericAPIView):
    '''
        Get-request handler for requests that the user created but not approved 
    '''
    authentication_classes = [JWTAuthentication]
    serializer_class = GetUnapprovedRequestModelSerializer
    queryset = UnApprovedRequestByOwnerModel.objects.all()

    def get(self, request:Request, *args, **kwargs):
        user = request.user
        try: 
            unapproved_request = UnApprovedRequestByOwnerModel.objects.filter(requesting_user=user)
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