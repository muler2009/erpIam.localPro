from rest_framework import generics, status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from workflow_manager.models.request_model import ApprovedRequestByRequestOwnerModel
from utils.custom_exception_handler import EmptyExceptionHandler
from workflow_manager.serilizers.get_request_serializer import GetApprovedRequestModelSerializer
from workflow_manager.serilizers.send_request_serializer import ApprovedRequestsByRequestSerializer



class GetAapprovedRequestsOfTheSender(generics.GenericAPIView):
    '''
        Get request handler for requests approved by the owner 
        which means requests on pending approval state 
    '''
    authentication_classes = [JWTAuthentication]
    serializer_class = GetApprovedRequestModelSerializer
    queryset = ApprovedRequestByRequestOwnerModel.objects.all()

    def get(self, request:Request, *args, **kwargs):
        user = request.user
        try: 
            approved_request = ApprovedRequestByRequestOwnerModel.objects.filter(requesting_user=user)
            if not approved_request:
                raise EmptyExceptionHandler(message="No Approved request Found", error_type='ERROR')
            approved_requests_seriallizer = self.serializer_class(approved_request, many=True, context={'request': request})
            return Response(approved_requests_seriallizer.data, status=status.HTTP_200_OK)

        except EmptyExceptionHandler as exc:
            return Response({'Error': exc.message, 'error_type': exc.error_type })