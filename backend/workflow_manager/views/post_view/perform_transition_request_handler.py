from rest_framework import generics, permissions, status, serializers
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from utils.custom_exception_handler import PostExceptionHandler
from ...models.request_model import RequestInWorkFlowModel, ApprovedRequestByRequestOwnerModel, ApprovedRequestsModel
from ...models.workflow_action_model import WorkFlowActionsModel
from ...models.workflow_transition_model import WorkFlowTransitionModel
from ...serilizers.send_request_serializer import UnApprovedRequestSerializer
from ...serilizers.get_state_serializer import GetStateModelSerializer
from rest_framework.exceptions import PermissionDenied
from rest_framework.parsers import MultiPartParser, FormParser

class PerformTransitionRequestHandler(generics.GenericAPIView):
    parser_classes = [MultiPartParser, FormParser]
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    # serializer_class = UnApprovedRequestSerializer

    def post(self, request: Request, *args, **kwargs):
        # get the request to be approved
        request_instance = ApprovedRequestByRequestOwnerModel.objects.get(pk=kwargs['request_id']) 
        # extract the action name 
        action_name = request.data.get('action_name')
        
        try:
            # get the action name assign to action 
            action = WorkFlowActionsModel.objects.get(action_name=action_name)  
            if not action:
                raise PostExceptionHandler(message=f"{action} not allowed", error_type="error")

            # Check if the current user is the assigned user
            if request_instance.request_assigned_to_user != request.user:
                raise PermissionDenied(detail="You are not authorized to approve this request")

            transition = WorkFlowTransitionModel.objects.get(from_state=request_instance.current_state, action_name=action) #
            if not transition:
                raise PostExceptionHandler(message=f"{transition.transition_name} not allowed")

            # Perform the actual transition from the current state to 
            request_instance.current_state = transition.to_state
            # request_instance.save()

            # Move the request to the new model (e.g., ApprovedRequestModel)
            approved_request = ApprovedRequestsModel.objects.create(
                title=request_instance.title,
                current_state=transition.to_state,
                requesting_user=request_instance.requesting_user,
                request_type=request_instance.request_type,  # Include this line
                # file_for_approval=request_instance.file_for_approval
                
            )

            serialized_state = GetStateModelSerializer(approved_request.current_state).data
            
            # Delete the original request from the current model
            request_instance.delete()

        except PostExceptionHandler as exc:
            return Response({"status": exc.message, "status_code": exc.error_type }, status=status.HTTP_400_BAD_REQUEST)
        except PermissionDenied as exc:
            return Response({"status_text": exc.detail, "status_code": 400 }, status=status.HTTP_400_BAD_REQUEST)
                    
        else:
            return Response({ "status_text": "Request successfully transitioned and moved.", "status_code": 201, "new_state": serialized_state})



         

