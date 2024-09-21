from rest_framework import generics, status, permissions, mixins, serializers
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
from dmsmodule.document_repository.models.document_version_control import DocumentVersionModel
from django.db import transaction
from rest_framework.parsers import FormParser, MultiPartParser
# from workflow_manager.models.workflow_action_model import WorkFlowActionsModel

# Configure logging
logging.basicConfig(level=logging.DEBUG)  # You can adjust the level to INFO or WARNING based on your needs
logger = logging.getLogger(__name__)


class ApprovedByRequestOwnerHandler(generics.GenericAPIView):
    # parser_classes = [MultiPartParser, FormParser]
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UnApprovedRequestSerializer

    def post(self, request, *args, **kwargs):
        request_id = request.data.get('request_id')
        action_name = request.data.get('action_name')

        if not request_id or not action_name:
            raise PostExceptionHandler("Request ID and action name are required.", error_type="invalid_data", status_code=400)

        try:
            unapproved_request = UnApprovedRequestByOwnerModel.objects.get(request_id=request_id)
        except UnApprovedRequestByOwnerModel.DoesNotExist:
            return Response({"detail": "Request not found."}, status=status.HTTP_404_NOT_FOUND)

        try:
            action = WorkFlowActionsModel.objects.get(action_name=action_name)
        except WorkFlowActionsModel.DoesNotExist:
            return Response({"detail": f"Action '{action_name}' not found."}, status=status.HTTP_404_NOT_FOUND)

        transition = WorkFlowTransitionModel.objects.filter(
            from_state=unapproved_request.approval_status,
            action_name=action
        ).first()

        if not transition:
            return Response({"detail": "Transition not allowed for this action."}, status=status.HTTP_400_BAD_REQUEST)

        # Perform the actual transition
        # unapproved_request.approval_status = transition.to_state

         # Start a transaction to ensure atomic operations
        with transaction.atomic():
            unapproved_request.approval_status = transition.to_state
            
            # Ensure file_for_approval is valid
            file_for_approval_instance = unapproved_request.file_for_approval

            if not file_for_approval_instance or not isinstance(file_for_approval_instance, DocumentVersionModel):
                raise serializers.ValidationError({"file_for_approval": "Invalid file for approval."})

            # Create the approved request
            approved_request = ApprovedRequestByRequestOwnerModel.objects.create(
                title=unapproved_request.title,
                requesting_user=unapproved_request.requesting_user,
                request_type=unapproved_request.request_type,
                current_state=transition.to_state,
                file_for_approval=file_for_approval_instance
            )

            # Create or update an entry in the IntermediateRequestModel
            IntermediateRequestModel.objects.create(
                request=approved_request,
                user=request.user,
                current_state=transition.to_state,
                stage_name='Initial Approval',
                role=request.user.roles.first() if request.user.roles.exists() else None,
                action_taken=action_name,
                comments=request.data.get('comments', '')
            )

            # Delete the unapproved request
            unapproved_request.delete()

            # Initiate approval workflow
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
       


# class ApprovedByRequestOwnerHandler(generics.GenericAPIView):
#     parser_classes = [MultiPartParser, FormParser]
#     authentication_classes = [JWTAuthentication]
#     permission_classes = [permissions.IsAuthenticated]
#     serializer_class = UnApprovedRequestSerializer

#     @transaction.atomic
#     def post(self, request, *args, **kwargs):
#         logger.info("Starting approval process")
#         request_id = request.data.get('request_id')
#         action_name = request.data.get('action_name')

#         if not request_id or not action_name:
#             logger.error("Missing request_id or action_name")
#             raise PostExceptionHandler("Request ID and action name are required.", error_type="invalid_data", status_code=400)

#         try:
#             unapproved_request = UnApprovedRequestByOwnerModel.objects.get(request_id=request_id)
#             logger.info(f"Unapproved request found: {unapproved_request}")
#         except UnApprovedRequestByOwnerModel.DoesNotExist:
#             logger.error(f"Unapproved request with ID {request_id} not found")
#             return Response({"detail": "Request not found."}, status=status.HTTP_404_NOT_FOUND)

#         try:
#             action = WorkFlowActionsModel.objects.get(action_name=action_name)
#             logger.info(f"Action found: {action}")
#         except WorkFlowActionsModel.DoesNotExist:
#             logger.error(f"Action '{action_name}' not found")
#             return Response({"detail": f"Action '{action_name}' not found."}, status=status.HTTP_404_NOT_FOUND)

#         transition = WorkFlowTransitionModel.objects.filter(
#             from_state=unapproved_request.approval_status,
#             action_name=action
#         ).first()

#         if not transition:
#             logger.error("Transition not allowed for this action.")
#             return Response({"detail": "Transition not allowed for this action."}, status=status.HTTP_400_BAD_REQUEST)

#         logger.info(f"Transition found: {transition}")

#         # Ensure file_for_approval is a valid DocumentVersionModel instance
#         file_for_approval_instance = unapproved_request.file_for_approval
#         if not isinstance(file_for_approval_instance, DocumentVersionModel):
#             logger.error(f"Invalid file_for_approval instance: {file_for_approval_instance}")
#             raise PostExceptionHandler("Invalid file_for_approval instance.", error_type="invalid_file", status_code=400)

#         logger.info(f"file_for_approval instance: {file_for_approval_instance}, Type: {type(file_for_approval_instance)}")

#         try:
#             # Create the Approved request
#             approved_request = ApprovedRequestByRequestOwnerModel.objects.create(
#                 title=unapproved_request.title,
#                 requesting_user=unapproved_request.requesting_user,
#                 request_type=unapproved_request.request_type,
#                 current_state=transition.to_state,  # Set state based on transition
#                 file_for_approval=file_for_approval_instance  # Maintain the same file_for_approval
#             )

#             logger.info(f"Approved request created: {approved_request}")

#             # Create or update an entry in the IntermediateRequestModel
#             IntermediateRequestModel.objects.create(
#                 request=approved_request,
#                 user=request.user,
#                 current_state=transition.to_state,
#                 stage_name='Initial Approval',
#                 role=request.user.roles.first() if request.user.roles.exists() else None,
#                 action_taken=action_name,
#                 comments=request.data.get('comments', '')
#             )

#             logger.info("IntermediateRequestModel entry created")

#             # Delete the UnApproved request
#             unapproved_request.delete()
#             logger.info(f"Unapproved request deleted: {unapproved_request}")

#             # Create approval stages for the approved request
#             self.initiate_approval_workflow(approved_request)

#             # Serialize and return the approved request
#             serializer = ApprovedRequestsByRequestSerializer(approved_request)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)

#         except Exception as e:
#             logger.exception("Error during approval process")
#             raise PostExceptionHandler(f"Error during approval process: {str(e)}", error_type="server_error", status_code=500)

#     def initiate_approval_workflow(self, approved_request):
#         logger.info("Initiating approval workflow")
#         process = approved_request.request_type.protocol_id
#         stage_templates = ApprovalStageTemplateModel.objects.filter(process=process).order_by('stage_order')

#         first_stage = None
#         for template in stage_templates:
#             stage = ApprovalStageModel.objects.create(
#                 request=approved_request,
#                 stage_name=template.stage_name,
#                 stage_level=template.stage_order,
#                 role=template.role,
#                 transition=None,
#             )
#             if first_stage is None:
#                 first_stage = stage

#         if first_stage:
#             approved_request.current_stage = first_stage
#             approved_request.save()
#             logger.info(f"First approval stage set: {first_stage}")












    

    

    

