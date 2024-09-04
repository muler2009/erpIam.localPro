from rest_framework import generics, permissions, status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.request import Request
from rest_framework.response import Response
from workflow_manager.serilizers.send_request_serializer import ApprovedRequestsByRequestSerializer, UnApprovedRequestSerializer
from utils.custom_exception_handler import PostExceptionHandler
from iam.models import UserAccountsModel
from iam.role.models.models import IamRoleModel
from workflow_manager.models.workflow_state_model import WorkFlowStateModel
from workflow_manager.models.workflow_protocol_model import WorkFlowProtocolModel
from rest_framework.parsers import FormParser, MultiPartParser
from dmsmodule.file_mangement.models.document_uploads_models import UploadedDocumentModel
from workflow_manager.models.request_model import RequestInWorkFlowModel
from workflow_manager.models.approval_level import ApprovalStageModel
from workflow_manager.models.workflow_transition_model import WorkFlowTransitionModel

class RequestSubmissionHandler(generics.GenericAPIView):
    parser_classes = [MultiPartParser, FormParser]
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UnApprovedRequestSerializer

    def post(self, request, *args, **kwargs):
        try:
            serializer = self.validate_request_data(request)
            # concerned_user = self.get_concerned_user(request.data)
            request_type = self.get_request_type(request.data)
            file_to_approve = self.check_duplicate_data(request)
            self.save_request(serializer, request.user, request_type, file_to_approve)     
        except PostExceptionHandler as exc:
            return Response({"message": exc.message, "error_code": exc.error_type, "status_code": exc.status_code}, status=400)
        else:
            return Response({'status_code': 201, 'statusText': "Request successfully submitted", 'data': serializer.data}, status=status.HTTP_201_CREATED) 
   
    def check_duplicate_data(self, request):
       
        file_to_approve = request.FILES.get('file_for_approval')
        
        if not file_to_approve:
            raise PostExceptionHandler(message="No file uploaded", error_type="no_file", status_code=402)
        # Check for a duplicate based on file name
        file_name = file_to_approve.name
        if UploadedDocumentModel.objects.filter(uploaded_document_name=file_name).exists():
            raise PostExceptionHandler(message="File with name already exist", error_type="DUPLICATE_FILE_FOUND", status_code=404)
        return file_to_approve
            
    def validate_request_data(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        return serializer

    # def get_concerned_user(self, data):
    #     username = data.get('request_assigned_to_user')
    #     user = UserAccountsModel.objects.filter(username=username).first()
    #     if not user:
    #         raise PostExceptionHandler("No user found with the given username")
    #     return user

    def get_request_type(self, data):
        protocol_name = data.get('request_type')
        if not protocol_name:
            raise PostExceptionHandler("Request type is required")
        return WorkFlowProtocolModel.objects.filter(protocol_id=protocol_name).first()

    def save_request(self, serializer, requesting_user, request_type, file_to_approve):
        serializer.save(
            requesting_user=requesting_user,
            request_type=request_type,
            file_for_approval=file_to_approve
        )

    
            










            

