from rest_framework import generics, permissions, status, serializers
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from utils.custom_exception_handler import PostExceptionHandler
from ..models.request_model import RequestInWorkFlowModel
from ..models.workflow_action_model import WorkFlowActionsModel
from ..models.workflow_transition_model import WorkFlowTransitionModel
from ..serilizers.get_request_serializer import RequestSubmissionModelSerializer

class PerformTransitionRequestHandler(generics.GenericAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = RequestSubmissionModelSerializer

    def post(self, request: Request, *args, **kwargs):
        # get the request to be approved
        request_instance = RequestInWorkFlowModel.objects.get(pk=kwargs['request_id']) 
        # extract the action name 
        action_name = request.data.get('action_name')

        try:
            # get the action name assign to action 
            if not action:
                raise PostExceptionHandler(message=f"{action} not allowed", error_type="error")
            action = WorkFlowActionsModel.objects.get(action_name=action_name)  

            if not transition:
                raise PostExceptionHandler(message=f"{transition.transition_name} not allowed")
            transition = WorkFlowTransitionModel.objects.get(from_state=request_instance.current_state, action_name=action) #
        except PostExceptionHandler as exc:
            return Response({
                "status": exc.message,
                "status_code": exc.error_type
            })
        
         # Perform the actual transition from the current state to 
        request_instance.current_state = transition.to_state
        request_instance.save()

        return Response({"status": "State transitioned", "new_state": request_instance.current_state.state_name})



         

