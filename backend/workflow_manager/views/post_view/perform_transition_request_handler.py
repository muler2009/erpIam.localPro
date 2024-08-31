from datetime import datetime
import uuid
from rest_framework import generics, permissions, status, serializers
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from utils.custom_exception_handler import PostExceptionHandler
from ...models.request_model import RequestInWorkFlowModel, ApprovedRequestByRequestOwnerModel, ApprovedRequestsModel
from ...models.workflow_state_model import WorkFlowStateModel
from ...models.workflow_action_model import WorkFlowActionsModel
from ...models.workflow_transition_model import WorkFlowTransitionModel
from ...serilizers.send_request_serializer import UnApprovedRequestSerializer
from ...serilizers.get_state_serializer import GetStateModelSerializer
from rest_framework.exceptions import PermissionDenied
from rest_framework.parsers import MultiPartParser, FormParser
import logging
from ...models.approval_level import ApprovalStageModel

from ...models.intermediate_request import IntermediateRequestModel

from ...serilizers.get_intermediate_request_serializer import ApprovalStageSerializer

# Configure logging
logging.basicConfig(level=logging.DEBUG)  # You can adjust the level to INFO or WARNING based on your needs
logger = logging.getLogger(__name__)


# class PerformTransitionRequestHandler(generics.GenericAPIView):
#     parser_classes = [MultiPartParser, FormParser]
#     authentication_classes = [JWTAuthentication]
#     permission_classes = [permissions.IsAuthenticated]
#     # serializer_class = UnApprovedRequestSerializer

#     def post(self, request: Request, *args, **kwargs):
#         request_instance = self.get_request_instance(kwargs['request_id'])
#         action_name = request.data.get('action_name')
#         try:
#             action = self.get_action(action_name)
#             self.validate_user_permission(request_instance, request.user)
#             transition = self.get_transition(request_instance.current_state, action)

#             # Perform the transition
#             request_instance.current_state = transition.to_state
#             request_instance.current_approval_level += 1

#             if request_instance.current_approval_level > request_instance.total_approval_levels:
#                 request_instance.current_state = WorkFlowStateModel.objects.get(state_name="Approved")
           
#             approved_request = self.create_approved_request(request_instance, transition)

#             serialized_state = GetStateModelSerializer(approved_request.current_state).data
            
#             # Delete the original request from the current model
#             request_instance.delete()

#         except PostExceptionHandler as exc:
#             return Response({"status": exc.message, "status_code": exc.error_type }, status=status.HTTP_400_BAD_REQUEST)
#         except PermissionDenied as exc:
#             return Response({"status_text": exc.detail, "status_code": 400 }, status=status.HTTP_400_BAD_REQUEST)
                    
#         else:
#             return Response({ "status_text": "Request successfully transitioned and moved.", "status_code": 201, "new_state": serialized_state})

            
#     def get_request_instance(self, request_id):
#         try:
#             return ApprovedRequestByRequestOwnerModel.objects.get(pk=request_id)
#         except ApprovedRequestByRequestOwnerModel.DoesNotExist:
#             raise PostExceptionHandler(message="Request not found", error_type="error")

#     def get_action(self, action_name):
#         try:
#             action = WorkFlowActionsModel.objects.get(action_name=action_name)
#             return action
#         except WorkFlowActionsModel.DoesNotExist:
#             raise PostExceptionHandler(message=f"Action {action_name} not allowed", error_type="error")

#     def validate_user_permission(self, request_instance, user):
#         if request_instance.request_assigned_to_user != user:
#             raise PermissionDenied(detail="You are not authorized to approve this request")

#     def get_transition(self, current_state, action):
#         try:
#             transition = WorkFlowTransitionModel.objects.get(from_state=current_state, action_name=action)
#             return transition
#         except WorkFlowTransitionModel.DoesNotExist:
#             raise PostExceptionHandler(message="Transition not allowed", error_type="error")

#     def create_approved_request(self, request_instance, transition):
#         approved_request = ApprovedRequestsModel.objects.create(
#             title=request_instance.title,
#             current_state=transition.to_state,
#             requesting_user=request_instance.requesting_user,
#             request_type=request_instance.request_type,
#             # file_for_approval=request_instance.file_for_approval
#         )
#         return approved_request


class PerformTransitionRequestHandler(generics.GenericAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ApprovalStageSerializer

    def post(self, request, *args, **kwargs):
        # request_id = request.data.get('request_id')
        request_id = kwargs.get('request_id')
        action_name = request.data.get('action_name')
        comments = request.data.get('comments', '')

        try:
            # if not self.is_valid_uuid(request_id):
            #     raise serializers.ValidationError(f'"{request_id}" is not a valid UUID.')

            if not self.is_valid_uuid(request_id):
                raise serializers.ValidationError({"detail": "Invalid request ID format. It should be a UUID."})

            if not request_id or not action_name:
                raise PostExceptionHandler({"detail": "Request ID and action name are required."}, status=status.HTTP_400_BAD_REQUEST)

            approved_request = self.get_request_instance(request_id)
            current_stage = approved_request.current_stage

            # Validate user permissions
            self.validate_user_permission(approved_request, request.user)
          

            if not current_stage:
                return Response({"detail": "No current approval stage found."}, status=status.HTTP_400_BAD_REQUEST)

            try:
                action = WorkFlowActionsModel.objects.get(action_name=action_name)
            except WorkFlowActionsModel.DoesNotExist:
                return Response({"detail": f"Action '{action_name}' not found."}, status=status.HTTP_404_NOT_FOUND)

            try:
                transition = WorkFlowTransitionModel.objects.get(
                    from_state=approved_request.current_state,
                    action_name=action
                )
            except WorkFlowTransitionModel.DoesNotExist:
                return Response({"detail": "Transition not allowed for this action."}, status=status.HTTP_400_BAD_REQUEST)

            # Perform the actual transition
            current_stage.transition = transition
            current_stage.comments = comments
            current_stage.approved_at = datetime.now() if action_name == "approved" else None
            current_stage.save()

            if action_name == "approved":
                # Move to the next stage or mark as fully approved if it's the last stage
                pending = WorkFlowStateModel.objects.get(state_name='pending for approval')
                next_stage = ApprovalStageModel.objects.filter(
                    request=approved_request,
                    stage_level__gt=current_stage.stage_level
                ).order_by('stage_level').first()

                if next_stage:
                    approved_request.current_stage = next_stage
                    approved_request.current_state = pending  # Set the state to 'pending approval'
                    approved_request.save()
                else:
                    approved_request.current_stage = None
                    approved_request.current_state = WorkFlowStateModel.objects.get(state_name="approved")  # Indicate that the process is completed
                    approved_request.save()

            else:  # Handle rejection or rejection with modification
                # Create an entry in IntermediateRequestModel to return it to the source
                IntermediateRequestModel.objects.create(
                    request=approved_request,
                    stage_name=current_stage.stage_name,
                    role=current_stage.role,
                    user=request.user,
                    action_taken=action_name,
                    comments=comments
                )

                # Set the current state back to the source state
                approved_request.current_stage = None
                approved_request.current_state = transition.to_state
                approved_request.save()

        except PostExceptionHandler as exc:
            return Response({"message": exc.message, "error": exc.error_type})
        else:
            return Response({"detail": "Approval stage transitioned successfully."}, status=status.HTTP_200_OK)
        
    def get_request_instance(self, request_id):
        try:
            return ApprovedRequestByRequestOwnerModel.objects.select_related('current_stage__transition').get(pk=request_id)
        except ApprovedRequestByRequestOwnerModel.DoesNotExist:
            raise PostExceptionHandler(message="Request not found", error_type="error")
        
    def validate_user_permission(self, request_instance, user):
        # Check if the current stage exists
        if not request_instance.current_stage:
            raise PostExceptionHandler(message="Request does not have a current stage", error_type="error")
        
        # Get the roles associated with the user
        user_roles = user.roles.all().values_list('role_name', flat=True)
        logger.info(f"User roles: {user_roles}")

        # Get the role associated with the current stage
        current_stage_role_name = request_instance.current_stage.role.role_name
        logger.info(f"Current stage role: {current_stage_role_name}")

        # Check if the user’s roles include the role required for the current stage
        if current_stage_role_name not in user_roles:
            raise PermissionDenied(detail="You are not authorized to approve this request")

        
    def is_valid_uuid(self, value):
        try:
            uuid.UUID(str(value))
            return True
        except ValueError:
            return False



# class PerformTransitionRequestHandler2(generics.GenericAPIView):
#     parser_classes = [MultiPartParser, FormParser]
#     authentication_classes = [JWTAuthentication]
#     permission_classes = [permissions.IsAuthenticated]

#     def post(self, request, *args, **kwargs):
#         request_instance = self.get_request_instance(kwargs['request_id'])
#         action_name = request.data.get('action_name')

#         try:
#             action = self.get_action(action_name)
#             self.validate_user_permission(request_instance, request.user)
#             transition = self.get_transition(request_instance.current_stage, action)

#             # Handle case where transition is None
#             if not transition:
#                 raise PostExceptionHandler(message="No valid transition found for the current stage and action", error_type="error")

#             # Perform the transition
#             next_stage = self.move_to_next_stage(request_instance, transition)
#             request_instance.current_stage = next_stage

#             # Check if there is no next stage, mark as fully approved
#             if not next_stage:
#                 request_instance.current_state = WorkFlowStateModel.objects.get(state_name="Approved")
#                 request_instance.save()
#                 serialized_state = GetStateModelSerializer(request_instance.current_state).data

#                 # Create an approved request record if it's fully approved
#                 approved_request = self.create_approved_request(request_instance)
#                 approved_request.save()

#                 # Delete the original request from the current model
#                 request_instance.delete()
#             else:
#                 request_instance.save()
#                 GetStateModelSerializer(next_stage.transition.to_state).data

#         except PostExceptionHandler as exc:
#             return Response({"status": exc.message, "status_code": exc.error_type}, status=status.HTTP_400_BAD_REQUEST)
#         except PermissionDenied as exc:
#             return Response({"status_text": exc.detail, "status_code": 403}, status=status.HTTP_403_FORBIDDEN)
#         except Exception as exc:
#             return Response({"status_text": str(exc), "status_code": 500}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
#         else:
#             return Response({
#                 'status': 'Successfully transition'
#             })
                
#     def get_request_instance(self, request_id):
#         try:
#             return ApprovedRequestByRequestOwnerModel.objects.select_related('current_stage__transition').get(pk=request_id)
#         except ApprovedRequestByRequestOwnerModel.DoesNotExist:
#             raise PostExceptionHandler(message="Request not found", error_type="error")

#     def get_action(self, action_name):
#         try:
#             return WorkFlowActionsModel.objects.get(action_name=action_name)
#         except WorkFlowActionsModel.DoesNotExist:
#             raise PostExceptionHandler(message=f"Action {action_name} not found", error_type="error")

    # def validate_user_permission(self, request_instance, user):
        # Check if the current stage exists
        if not request_instance.current_stage:
            raise PostExceptionHandler(message="Request does not have a current stage", error_type="error")
        
        # Get the roles associated with the user
        user_roles = user.roles.all().values_list('role_name', flat=True)
        logger.info(f"User roles: {user_roles}")

        # Get the role associated with the current stage
        current_stage_role_name = request_instance.current_stage.role.role_name
        logger.info(f"Current stage role: {current_stage_role_name}")

        # Check if the user’s roles include the role required for the current stage
        if current_stage_role_name not in user_roles:
            raise PermissionDenied(detail="You are not authorized to approve this request")
        
#     def get_next_stage_template(self, transition):
#         # Logic to determine the next stage template based on the transition
#         next_state = transition.to_state
#         try:
#             return IntermediateRequestModel.objects.filter(stage_name=next_state.state_name).first()
#         except IntermediateRequestModel.DoesNotExist:
#             return None

#     def move_to_next_stage(self, request_instance, transition):
#         # Create a new entry in RequestApprovalStageModel for the next stage
#         next_stage_template = self.get_next_stage_template(transition)
#         if next_stage_template:
#             next_stage = IntermediateRequestModel.objects.create(
#                 request=request_instance,
#                 stage_name=next_stage_template.stage_name,
#                 role=next_stage_template.role,
#             )
#             return next_stage

#         return None
            
#     def get_transition(self, current_stage, action):
#         logger.info(f"Current stage: {current_stage}")
#         logger.info(f"Request Instance: {current_stage.stage_name}")
#         logger.info(f"Request Transition: {current_stage.transition}")
#         try:
#             # Ensure current_stage has a transition before accessing its attributes
#             if not current_stage.transition:
#                 raise PostExceptionHandler(message="Current stage does not have a valid transition", error_type="error")
            
#             return WorkFlowTransitionModel.objects.get(
#                 from_state=current_stage.transition.from_state, 
#                 action_name=action
#             )
#         except WorkFlowTransitionModel.DoesNotExist:
#             raise PostExceptionHandler(message="Transition not allowed", error_type="error")


#     def get_final_state(self, state_name):
#         try:
#             return WorkFlowStateModel.objects.get(state_name=state_name)
#         except WorkFlowStateModel.DoesNotExist:
#             raise PostExceptionHandler(message=f"Final state {state_name} not found", error_type="error")

#     def create_approved_request(self, request_instance):
#         ApprovedRequestsModel.objects.create(
#             title=request_instance.title,
#             current_state=request_instance.current_state,
#             requesting_user=request_instance.requesting_user,
#             request_type=request_instance.request_type,
#             file_for_approval=request_instance.file_for_approval  # Optional if needed
#         )


         

