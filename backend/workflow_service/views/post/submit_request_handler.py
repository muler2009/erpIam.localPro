from django.db import transaction
from rest_framework import status, generics, mixins, permissions
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from utils.custom_exception_handler import CustomExceptionForError
from rest_framework.parsers import FormParser, MultiPartParser
from ...models.workflow_action_model import WorkflowActionModel
from ...models.workflow_transition_model import WorkflowProcessTransitionModel
from ...serializers.create.saved_request_serializer import SaveRequestSerializer
from ...serializers.create.submit_request_serializer import SubmitRequestSerializer
from ...models.saved_request import SavedRequestModel
from ...models.submitted_request import SubmittedRequestForApprovalModel
from ..helper.submit_request_util_function import *
from ..helper.file_helper_functions import *

import logging
logger = logging.getLogger(__name__)


class SubmitRequestHandler(generics.GenericAPIView, mixins.CreateModelMixin):
    authentication_classes = [JWTAuthentication]
    serializer_class = SaveRequestSerializer
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request:Request, *args, **kwargs):
        try:
            request_id = request.data.get("request_id")
            saved_request = SavedRequestModel.objects.get(request_id=request_id)            
            action = WorkflowActionModel.objects.get(action_name=request.data.get("action_name"))

            # Ensure required fields are provided
            if not request_id or not action:
                raise CustomExceptionForError(message="Request ID or action name is missing.", error_type="MISSING_FIELDS")
            
            approval_process = saved_request.approval_process
            # Check if user is allowed to submit using the helper function
            
            check_user_allowed_roles(request.user, approval_process)

            transition = WorkflowProcessTransitionModel.objects.filter(
                from_state=saved_request.saved_request_status,
                action_name=action
            ).first()
            
            if not saved_request or not request.data.get("action_name"):
                raise CustomExceptionForError(message="Either request or action not available", error_type="NO_REQUEST")
            
            with transaction.atomic():
                saved_request.saved_request_status = transition.to_state
                file_for_approval_instance = saved_request.file_for_approval

                check_uploaded_file(file_for_approval_instance)
                            
                # Create the approved request
                submitted_request = SubmittedRequestForApprovalModel.objects.create(
                    request_title=saved_request.request_title,
                    request_send_by=request.user,
                    approved_by=request.user,
                    approval_process=saved_request.approval_process,
                    request_status=transition.to_state,
                    file_for_approval=file_for_approval_instance
                )

                saved_request.delete()
                # Initiate approval workflow
                 
                initiate_approval_workflow(submitted_request)

            serializer = SubmitRequestSerializer(submitted_request, context={'request': request})

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        except SavedRequestModel.DoesNotExist:
            return Response({
                "message": "No Associated request found",
                "error_type": "NO REQUEST"
            }, status=status.HTTP_404_NOT_FOUND)
            
        except CustomExceptionForError as exc:
            return Response({
                "message": exc.message,
                "error_type": exc.error_type
            }, status=status.HTTP_400_BAD_REQUEST)
        
    
   


            
        
