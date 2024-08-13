from rest_framework import generics, permissions, status
from rest_framework.request import Request
from rest_framework.response import Response
from workflow_manager.serilizers.create_request_serializer import RequestSendSerializer
from utils.custom_exception_handler import PostExceptionHandler
from iam.models import UserAccountsModel
from workflow_manager.models.workflow_state_model import WorkFlowStateModel
from workflow_manager.models.request_model import RequestInWorkFlowModel
from workflow_manager.models.workflow_protocol_model import WorkFlowProtocolModel

class RequestSubmissionHandler(generics.GenericAPIView):
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
        except PostExceptionHandler as exc:
            return Response({
                "message": exc.message,
                "error_code": exc.error_type
            }, status=400)
        
        else:
            return Response({
                'message': "Request successfully submitted",
                'data': request_serializer.data
            }, status=201)

            





class RequestSubmissionHandler_2(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = RequestSendSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,)
        try:
            # Validate the data
            if not serializer.is_valid(raise_exception=True):
                raise PostExceptionHandler(message="Request data is invalid", error_type="REQUEST_FAILED")

            # Get the user account associated with the requesting user
            user_account = UserAccountsModel.objects.get(username=self.request.user)
            
            # Get the initial state (e.g., "Draft")
            initial_state = WorkFlowStateModel.objects.get(state_name='Draft')

            # Save the request
            request_instance = serializer.save(requesting_user=user_account, current_state=initial_state)

            # Notify the recipient if applicable
            self.notify_recipient(request_instance=request_instance)

        except PostExceptionHandler as exc:
            return Response({
                "message": exc.message,
                "error_code": exc.error_type
            }, status=400)
        
        else:
            return Response({
                'message': "Request successfully submitted",
                'request_id': request_instance.id,
                'user': user_account
            }, status=201)

    def notify_recipient(self, request_instance):
        recipient = request_instance.request_assigned_to_user
        if recipient:
            # Implement the actual notification logic here.
            print(f"Notification sent to {recipient.email}: You have a new request.")









            

