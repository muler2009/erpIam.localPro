from rest_framework import generics, permissions, status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.request import Request
from rest_framework.response import Response
from workflow_manager.serilizers.send_request_serializer import RequestSendSerializer
from utils.custom_exception_handler import PostExceptionHandler
from iam.models import UserAccountsModel
from workflow_manager.models.workflow_state_model import WorkFlowStateModel
from workflow_manager.models.request_model import RequestInWorkFlowModel
from workflow_manager.models.workflow_protocol_model import WorkFlowProtocolModel
from workflow_manager.helper.send_notification import SendNotification

class RequestSubmissionHandler(generics.GenericAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = RequestSendSerializer

    def post(self, request, *args, **kwargs):
        request_serializer = self.serializer_class(data=request.data)
        try: 

            if not request_serializer.is_valid(raise_exception=True):
                raise PostExceptionHandler(message="Something went wrong", error_type="Error")
            
            initial_state = WorkFlowStateModel.objects.get(state_name="Draft")
            requesting_user = self.request.user
            protocol_name = request.data.get('request_type')

            if not protocol_name:
                raise PostExceptionHandler("Request type is required")

            username = request.data.get('request_assigned_to_user')
            concerned_user = UserAccountsModel.objects.filter(username=username).first()
            if not concerned_user:
                raise PostExceptionHandler("No user found with the given username")

            request_type = WorkFlowProtocolModel.objects.filter(protocol_id=protocol_name).first()

            # Save the request and assign it to the concerned user
            request_serializer.save(
                requesting_user=requesting_user,
                current_state=initial_state,
                request_type=request_type,
                request_assigned_to_user=concerned_user
            )
            # SendNotification(recipient=concerned_user, request_instance=request_instance).send_notification()          
        except PostExceptionHandler as exc:
            return Response({
                "message": exc.message,
                "error_code": exc.error_type
            }, status=400)
        
        else:
            return Response({
                'message': "Request successfully submitted",
                'data': request_serializer.data,
                
            }, status=201)

            










            

