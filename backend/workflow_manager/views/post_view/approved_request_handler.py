from rest_framework import generics, status, permissions
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from utils.custom_exception_handler import PostExceptionHandler, EmptyExceptionHandler
from ...models.approval_level import ApprovalStageModel
from ...models.request_model import UnApprovedRequestByOwnerModel, ApprovedRequestByRequestOwnerModel, ApprovedRequestsModel
from ...models.workflow_action_model import WorkFlowActionsModel
from ...models.workflow_transition_model import WorkFlowTransitionModel
from ...models.workflow_protocol_model import WorkFlowProtocolModel
from ...models.workflow_state_model import WorkFlowStateModel
from ...serilizers.send_request_serializer import ApprovedRequestsByRequestSerializer, UnApprovedRequestSerializer
from ...serilizers.get_request_serializer import GetFinalApprovedRequestModelSerializer
from iam.role.models.models import IamRoleModel
from ...serilizers.get_state_serializer import GetStateModelSerializer
from ...models.approval_processes import ApprovalStageTemplateModel
from ...models.intermediate_request import IntermediateRequestModel
import logging
# from workflow_manager.models.workflow_action_model import WorkFlowActionsModel

# Configure logging
logging.basicConfig(level=logging.DEBUG)  # You can adjust the level to INFO or WARNING based on your needs
logger = logging.getLogger(__name__)


class ApprovedByRequestOwnerHandler(generics.GenericAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UnApprovedRequestSerializer

    def post(self, request, *args, **kwargs):
        request_id = request.data.get('request_id')
        action_name = request.data.get('action_name')

        if not request_id or not action_name:
            raise PostExceptionHandler({"detail": "Request ID and action name are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            unapproved_request = UnApprovedRequestByOwnerModel.objects.get(request_id=request_id)
        except UnApprovedRequestByOwnerModel.DoesNotExist:
            return Response({"detail": "Request not found."}, status=status.HTTP_404_NOT_FOUND)

        try:
            action = WorkFlowActionsModel.objects.get(action_name=action_name)
        except WorkFlowActionsModel.DoesNotExist:
            return Response({"detail": f"Action '{action_name}' not found."}, status=status.HTTP_404_NOT_FOUND)

        try:
            transition = WorkFlowTransitionModel.objects.get(
                from_state=unapproved_request.approval_status,
                action_name=action
            )
        except WorkFlowTransitionModel.DoesNotExist:
            return Response({"detail": "Transition not allowed for this action."}, status=status.HTTP_400_BAD_REQUEST)

        # Perform the actual transition
        unapproved_request.approval_status = transition.to_state

        # Create the Approved request
        approved_request = ApprovedRequestByRequestOwnerModel.objects.create(
            title=unapproved_request.title,
            requesting_user=unapproved_request.requesting_user,
            # request_assigned_to_user=unapproved_request.request_assigned_to_user,
            request_type=unapproved_request.request_type,
            current_state=transition.to_state,  # Set the state from transition
            file_for_approval=unapproved_request.file_for_approval
        )

        # Save the Approved request
        approved_request.save()

         # Create or update an entry in the IntermediateRequestModel
        intermediate_request = IntermediateRequestModel.objects.create(
            request=approved_request,
            user=request.user,
            current_state=transition.to_state,
            stage_name='Initial Approval',  # Set the appropriate stage name
            role=request.user.roles.first(),  # Assume the first role of the user is the one acting
            action_taken=action_name,
            comments=request.data.get('comments', '')
        )

        # Delete the UnApproved request
        unapproved_request.delete()

        # Create approval stages for the approved request
        self.initiate_approval_workflow(approved_request)

        # Serialize and return the approved request
        serializer = ApprovedRequestsByRequestSerializer(approved_request)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def initiate_approval_workflow(self, approved_request):
        """
        Create approval stages based on the ApprovalStageTemplateModel associated with the request's process.
        """
        # Fetch the process from the approved request
        process = approved_request.request_type.protocol_id

        # Fetch the stage templates for the process
        stage_templates = ApprovalStageTemplateModel.objects.filter(process=process).order_by('stage_order')

        first_stage = None
        # Create approval stages based on templates
        for template in stage_templates:
            stage = ApprovalStageModel.objects.create(
                request=approved_request,
                stage_name=template.stage_name,
                stage_level=template.stage_order,
                role=template.role,
                transition=None,  # Set this when the stage is processed
            )

            if first_stage is None:
                first_stage = stage

        if first_stage:
            approved_request.current_stage = first_stage
            approved_request.save()
       










       

    # def initiate_approval_workflow(self, approved_request):
    #     """
    #     Initiate the approval stages and transitions based on the ProcessModel.
    #     """
    #     process = approved_request.request_type.protocol_id  # Assuming request_type is linked to WorkFlowProtocolModel

    #     # Fetch all stages for the process, ordered by the defined sequence
    #     stages = ApprovalStageTemplateModel.objects.filter(process=process).order_by('stage_order')
    #     # You might want to order by a specific field if available

    #     previous_stage = None
    #     for stage_template in stages:
    #         # Create each stage for the approved request
    #         stage = ApprovalStageModel.objects.create(
    #             request=approved_request,
    #             stage_name=stage_template.stage_name,
    #             role=stage_template.role,
    #             stage_level=stage_template.stage_order,
    #             comments="",
    #         )

    #         if previous_stage:
    #             # Create a transition from the previous stage to the current stage
    #             transition = WorkFlowTransitionModel.objects.create(
    #                 from_state=previous_stage,
    #                 to_state=stage,
    #                 action=None,  # Action will be defined later when moving to the next stage
    #             )

    #             previous_stage.transition = transition
    #             previous_stage.save()

    #         previous_stage = stage

    #         first_stage = approved_request.request_approval_stages.order_by('stage_level').first()
            
    #         if first_stage:
               
    #             approved_request.current_stage = first_stage
    #             approved_request.current_state = WorkFlowStateModel.objects.get(state_name='pending for approval')
    #             approved_request.save()
    #         else:
    #             raise PostExceptionHandler(message="No stages were created, unable to set the current stage", error_type="error")







    # def initiate_approval_workflow(self, created_request):
    #     logger.debug("Starting approval workflow initiation for request: %s", created_request.request_id)
        
    #     # Fetch the 'approved' action
    #     action = WorkFlowActionsModel.objects.get(action_name='approved') 
        
    #     # Fetch the workflow protocol based on the request type
    #     request_type = created_request.request_type.protocol_id
    #     try:
    #         workflow_protocol = WorkFlowProtocolModel.objects.get(protocol_id=request_type)
    #         logger.debug("Workflow protocol found: %s", workflow_protocol.protocol_name)
    #     except WorkFlowProtocolModel.DoesNotExist:
    #         logger.error("Workflow protocol not found for request type: %s", request_type)
    #         raise PostExceptionHandler(message="Workflow protocol not found", error_type="error")

    #     # Fetch all stages for the process, ordered by the defined sequence
    #     stages_sequence = ApprovalStageTemplateModel.objects.filter(process=request_type).order_by('stage_order')
        
    #     previous_stage_instance = None  # This will hold the last created stage to establish transitions

    #     for stage_template in stages_sequence:
    #         stage_name = stage_template.stage_name
    #         logger.debug("Processing stage: %s", stage_name)

    #         try:
    #             # Fetch the role associated with the current stage
    #             role = IamRoleModel.objects.get(role_name=stage_name)
    #             logger.debug("Role found for stage: %s", role.role_name)
    #         except IamRoleModel.DoesNotExist:
    #             logger.error("Role '%s' not found", stage_name)
    #             raise PostExceptionHandler(message=f"Role '{stage_name}' not found", error_type="error")
            
    #         # Create the stage
    #         stage_instance = ApprovalStageModel.objects.create(
    #             request=created_request,
    #             stage_name=stage_name,
    #             role=role,
    #             stage_level=stage_template.stage_order,
    #         )
            
    #         logger.info("Approval stage created: %s for request: %s", stage_name, created_request.request_id)

    #         if previous_stage_instance:
    #             # Create a transition from the previous stage to the current stage
    #             from_state = WorkFlowStateModel.objects.get_or_create(state_name=previous_stage_instance.stage_name)[0]
    #             to_state = WorkFlowStateModel.objects.get_or_create(state_name=stage_instance.stage_name)[0]
                
    #             transition = WorkFlowTransitionModel.objects.create(
    #                 from_state=from_state,
    #                 to_state=to_state,
    #                 action=action  # Action can be approved, reject, etc.
    #             )
                
    #             # Link the transition to the previous stage
    #             previous_stage_instance.transition = transition
    #             previous_stage_instance.save()

    #         previous_stage_instance = stage_instance

    #         # Set the first approval stage as the current stage
    #         first_stage = created_request.request_approval_stages.order_by('stage_level').first()

    #         if first_stage:
    #             created_request.current_stage = first_stage
    #             created_request.current_state = WorkFlowStateModel.objects.get(state_name='pending for approval')
    #             created_request.save()
    #         else:
    #             raise PostExceptionHandler(message="No stages were created, unable to set the current stage", error_type="error")
















    

    

    

