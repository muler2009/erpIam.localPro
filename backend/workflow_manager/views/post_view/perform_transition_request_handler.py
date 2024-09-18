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
from django.shortcuts import get_object_or_404
from notification.models.core_notification_model import NotificationModel

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
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        # request_id = request.data.get('request_id')
        request_id = kwargs.get('request_id')
        action_name = request.data.get('action_name')
        comments = request.data.get('comments', '')
        
        try:
            if not self.is_valid_uuid(request_id):
                raise serializers.ValidationError({"detail": "Invalid request ID format. It should be a UUID."})

            if not request_id or not action_name:
                raise PostExceptionHandler({"detail": "Request ID and action name are required."}, status=status.HTTP_400_BAD_REQUEST)

            approved_request = self.get_request_instance(request_id)

            # if not current_stage:
            #     return Response({"detail": "No current approval stage found."}, status=status.HTTP_400_BAD_REQUEST)
            
            current_stage = approved_request.current_stage
            if not current_stage:
                return Response({"detail": "No current approval stage found."}, status=status.HTTP_400_BAD_REQUEST)

            # Validate user permissions
            self.validate_user_permission(approved_request, request.user)

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

            # Create an intermediate record
            IntermediateRequestModel.objects.create(
                request=approved_request,
                stage_name=current_stage.stage_name,
                role=current_stage.role,
                user=request.user,
                action_taken=action_name,
                comments=comments,
                current_state=approved_request.current_state
            )

            # Perform the actual transition
            current_stage.transition = transition
            current_stage.comments = comments
            current_stage.approved_at = datetime.now() if action_name == "approved" else None
            # current_stage.assigned_user = approved_request.request_assigned_to_user  # Set the assigned user to the current stage
            current_stage.save()

            if action_name == "approved":
                self.handle_approved_request(
                    approved_request=approved_request, 
                    current_stage=current_stage, 
                    transition=transition, 
                    comments=comments, 
                    request=request, 
                    action_name=action_name
                )
            elif action_name == "Rejected With Modification":
                self.handle_rejected_requests_for_modification(
                    rejected_request=approved_request, 
                    current_stage=current_stage, 
                    comments=comments, 
                    action_name=action_name
                )
            else:
                self.handle_rejected_requests(
                    approved_request=approved_request,
                    current_stage=current_stage,
                    comments=comments
                )

        
        except PostExceptionHandler as exc:
            return Response({
               'message': exc.message,
               'error': exc.error_type
            }, status=status.HTTP_400_BAD_REQUEST)
        
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

    def delete_intermediate_requests(self, request_instance, action):
        IntermediateRequestModel.objects.filter(request=request_instance, action_taken=action).delete()
        
    def is_valid_uuid(self, value):
        try:
            uuid.UUID(str(value))
            return True
        except ValueError:
            return False
        
    def handle_approved_request(self, approved_request, current_stage, transition, comments, request, action_name):
        # Move to the next stage or mark as fully approved if it's the last stage
        pending = WorkFlowStateModel.objects.get(state_name='pending for approval')
        next_stage = ApprovalStageModel.objects.filter(
            request=approved_request,
            stage_level__gt=current_stage.stage_level
        ).order_by('stage_level').first()             

        if next_stage:
            # Update the approved request to the next stage and state
            approved_request.current_stage = next_stage
            approved_request.current_state = pending  # Set the state to 'pending approval'
            approved_request.save()
           
            IntermediateRequestModel.objects.create(
                request=approved_request,
                stage_name=next_stage.stage_name,
                role=next_stage.role,             
                user=self.request.user,  # Set the user performing the approval
                action_taken=action_name,
                comments=comments,
                current_state=pending
            )

        else:
            approved_request.current_stage = None
            approved_request.current_state = WorkFlowStateModel.objects.get(state_name="approved")  # Indicate that the process is completed
            
            IntermediateRequestModel.objects.filter(request=approved_request).delete()
            # Remove all stages after the final approval
            ApprovalStageModel.objects.filter(request=approved_request).delete()

        approved_request.save()


    def handle_rejected_requests(self, approved_request, current_stage, comments):
        # Get the previous approval stage
        previous_approval = IntermediateRequestModel.objects.filter(
            request=approved_request,
            action_taken="approved"
        ).order_by('-request_updated_at').first()

        if previous_approval:
            try:
                # Get the previous approval stage
                previous_stage = ApprovalStageModel.objects.get(stage_name=previous_approval.stage_name, request=approved_request)
            except ApprovalStageModel.DoesNotExist:
                raise PostExceptionHandler(message="Approval Stage doesn't exist", error_type="DoesNotExist")

            # Update the current request to reflect the rejection and revert to the previous stage
            approved_request.current_stage = previous_stage
            approved_request.current_state = WorkFlowStateModel.objects.get(state_name="pending for approval")
            approved_request.save()

            # Mark the previous approval as rejected with comments
            previous_approval.action_taken = "rejected"
            previous_approval.comments = comments
            previous_approval.save()

            # Notify the previous approver
            NotificationModel.objects.create(
                notification_recepient=previous_approval.user,
                notification_message=f"Request '{approved_request.title}' has been rejected and sent back for your review.",
                notification_type="In_app",
                notification_metadata={'request': str(approved_request.request_id)}
            )

            # Notify the initiator about the rejection and the user who rejected it
            initiator = approved_request.requesting_user
            NotificationModel.objects.create(
                notification_recepient=initiator,
                notification_message=f"Your request '{approved_request.title}' has been rejected by {previous_approval.user.username}.",
                notification_type="In_app",
                notification_metadata={'request': str(approved_request.request_id), 'rejected_by': previous_approval.user.username}
            )
        else:
            # If no previous approval exists, handle the rejection and notify the initiator
            initiator = approved_request.requesting_user
            approved_request.current_stage = None
            approved_request.current_state = WorkFlowStateModel.objects.get(state_name="rejected")
            approved_request.save()

            # Create a rejection record in IntermediateRequestModel
            IntermediateRequestModel.objects.create(
                request=approved_request,
                stage_name=current_stage.stage_name,
                role=current_stage.role,
                action_taken="rejected",
                comments=comments,
                user=initiator,
                current_state=approved_request.current_state,
            )

            # Notify the initiator about the rejection
            NotificationModel.objects.create(
                notification_recepient=initiator,
                notification_message=f"Your request '{approved_request.title}' has been rejected.",
                notification_type="In_app",
                notification_metadata={'request': str(approved_request.request_id)}
            )

    def handle_rejected_requests_for_modification(self, rejected_request, current_stage, comments, action_name):
        rejected_state = WorkFlowStateModel.objects.get(state_name="pending for approval")
        
        previous_stage = ApprovalStageModel.objects.filter(
            request=rejected_request,
            stage_level__lt=current_stage.stage_level
        ).order_by('-stage_level').first()

        if previous_stage:
            #Update the rejected_request's current_stage and current_state
            rejected_request.current_stage = previous_stage  # Move back to the previous stage
            rejected_request.current_state = rejected_state  # Set the state to 'rejected'
            rejected_request.save()

            # Create a new IntermediateRequestModel entry with the rejection details
            IntermediateRequestModel.objects.create(
                request=rejected_request,
                stage_name=previous_stage.stage_name,  # Current stage that was rejected
                role=previous_stage.role,  # Role of the current stage
                user=rejected_request,
                action_taken=action_name,
                comments=comments,
                current_state=rejected_state  # Ensure this is the correct WorkFlowStateModel instance
            )
            # # Notify the previous approver (Optional: Implement notification logic here)
            # NotificationModel.objects.create(
            #     notification_recepient=previous_stage.user,
            #     notification_message=f"Request '{rejected_request.title}' has been rejected and sent back for your review.",
            #     notification_type="In_app",
            #     notification_metadata={'request': str(rejected_request.request_id)}
            # )

   
   



# class PerformTransitionRequestHandler(generics.GenericAPIView):
#     authentication_classes = [JWTAuthentication]
#     permission_classes = [permissions.IsAuthenticated]
#     serializer_class = ApprovalStageSerializer
#     parser_classes = [MultiPartParser, FormParser]

#     def post(self, request, *args, **kwargs):
#         request_id = kwargs.get('request_id')
#         action_name = request.data.get('action_name')
#         comments = request.data.get('comments', '')

#         if not self.is_valid_uuid(request_id):
#             return Response({"detail": "Invalid request ID format. It should be a UUID."}, status=status.HTTP_400_BAD_REQUEST)

#         if not request_id or not action_name:
#             return Response({"detail": "Request ID and action name are required."}, status=status.HTTP_400_BAD_REQUEST)

#         # Retrieve the approved request
#         approved_request = self.get_request_instance(request_id)
#         if not approved_request:
#             return Response({"detail": "Approved request not found."}, status=status.HTTP_404_NOT_FOUND)

#         current_stage = approved_request.current_stage
#         if not current_stage:
#             return Response({"detail": "No current approval stage found."}, status=status.HTTP_400_BAD_REQUEST)

#         # Validate user permissions
#         self.validate_user_permission(approved_request, request.user)

#         action = self.get_action(action_name)
#         if not action:
#             return Response({"detail": f"Action '{action_name}' not found."}, status=status.HTTP_404_NOT_FOUND)

#         transition = self.get_transition(approved_request.current_state, action)
#         if not transition:
#             return Response({"detail": "Transition not allowed for this action."}, status=status.HTTP_400_BAD_REQUEST)

#         # Create an intermediate record
#         self.create_intermediate_record(approved_request, current_stage, request.user, action_name, comments)

#         # Perform the transition
#         self.perform_transition(approved_request, current_stage, transition, action_name, request)

#         return Response({"detail": "Approval stage transitioned successfully."}, status=status.HTTP_200_OK)

#     def is_valid_uuid(self, uuid_string):
#         try:
#             uuid.UUID(uuid_string)
#             return True
#         except ValueError:
#             return False

#     def get_request_instance(self, request_id):
#         return get_object_or_404(ApprovedRequestByRequestOwnerModel, request_id=request_id)

#     def validate_user_permission(self, request_instance, user):
#         if not user.has_perm('change_request', request_instance):
#             raise serializers.ValidationError({"detail": "User does not have permission to perform this action."})

#     def get_action(self, action_name):
#         return WorkFlowActionsModel.objects.filter(action_name=action_name).first()

#     def get_transition(self, current_state, action):
#         return WorkFlowTransitionModel.objects.filter(from_state=current_state, action_name=action).first()

#     def create_intermediate_record(self, request_instance, current_stage, user, action_name, comments):
#         IntermediateRequestModel.objects.create(
#             request=request_instance,
#             stage_name=current_stage.stage_name,
#             role=current_stage.role,
#             user=user,
#             action_taken=action_name,
#             comments=comments
#         )

#     def perform_transition(self, approved_request, current_stage, transition, request, action_name):
#         if action_name == "approved":
#             self.handle_approval(approved_request, current_stage, transition, request)
#         else:
#             self.handle_rejection(approved_request, current_stage, transition, request)

#     def handle_approval(self, approved_request, current_stage, transition):
#         pending = WorkFlowStateModel.objects.get(state_name='pending for approval')
#         next_stage = ApprovalStageModel.objects.filter(
#             request=approved_request,
#             stage_level__gt=current_stage.stage_level
#         ).order_by('stage_level').first()

#         self.delete_intermediate_requests(approved_request)

#         if next_stage:
#             approved_request.current_stage = next_stage
#             approved_request.current_state = pending
#             approved_request.request_assigned_to_user = next_stage.assign_user  # Assign the user for the next stage
#         else:
#             approved_request.current_stage = None
#             approved_request.current_state = WorkFlowStateModel.objects.get(state_name="approved")
#             self.create_final_approved_request(approved_request, transition)
#             approved_request.request_assigned_to_user = None  # Final approval, no more assignment needed

#         approved_request.save()

#     def handle_rejection(self, approved_request, current_stage, transition, request):
#         IntermediateRequestModel.objects.create(
#             request=approved_request,
#             stage_name=current_stage.stage_name,
#             role=current_stage.role,
#             user=request.user,
#             action_taken="rejected",
#             comments=request.data.get('comments', '')
#         )
#         approved_request.current_stage = None
#         approved_request.current_state = transition.to_state
#         approved_request.save()

#     def delete_intermediate_requests(self, approved_request):
#         IntermediateRequestModel.objects.filter(request=approved_request).delete()

#     def create_final_approved_request(self, approved_request, transition):
#         ApprovedRequestByRequestOwnerModel.objects.create(
#             title=approved_request.title,
#             requesting_user=approved_request.requesting_user,
#             request_assigned_to_user=approved_request.request_assigned_to_user,
#             request_type=approved_request.request_type,
#             current_state=transition.to_state,
#             file_for_approval=approved_request.file_for_approval
#         )
#         ApprovalStageModel.objects.filter(request=approved_request).delete()
# try:
#                # Retrieve the previous stage with the highest level below the current stage
#                 logger.info(f"Current stage is : {current_stage.stage_level}")
#                 previous_stage = ApprovalStageModel.objects.filter(
#                     request=approved_request,
#                     stage_level__lt=current_stage.stage_level
#                 ).order_by('-stage_level').first()

#                 if previous_stage:
#                     # Log previous stage details for debugging
#                     logger.info(f"Previous Stage: {previous_stage.stage_name}, Stage Level: {previous_stage.stage_level} ")

#                     # Retrieve the most recent approval for the previous stage
#                     previous_approver = IntermediateRequestModel.objects.filter(
#                         request=approved_request,
#                         stage_name=previous_stage.stage_name,
#                         action_taken=action_name  # Ensure we get the most recent approval action
#                     ).order_by('-stage_name').first()  # Most recent approval action

#                     if previous_approver:
#                         logger.info(f"Previous Approver: {previous_approver.user}")
#                     else:
#                         logger.warning("No previous approver found for the previous stage")

#                 else:
#                     logger.warning("No previous stage found")
#                     previous_approver = None

#             except IntermediateRequestModel.DoesNotExist:
#                 logger.error("Error retrieving previous approver")
#                 previous_approver = None






































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


         

