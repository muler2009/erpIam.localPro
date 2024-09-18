from django.db import transaction
from rest_framework import generics, permissions, status,mixins
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.request import Request
from rest_framework.response import Response
from workflow_manager.serilizers.send_request_serializer import UnApprovedRequestSerializer
from utils.custom_exception_handler import PostExceptionHandler
from workflow_manager.models.workflow_protocol_model import WorkFlowProtocolModel
from rest_framework.parsers import FormParser, MultiPartParser
from dmsmodule.file_mangement.models.document_uploads_models import DocumentVersion
from dmsmodule.file_mangement.serializers.document_info_serializer import DocumentInformationSerializer, CreateDocumentInformationSerializer
from dmsmodule.file_mangement.serializers.document_version_serialzier import DocumentVersionSerializer
from dmsmodule.file_mangement.serializers.get_document_serializer import GetDocumentSerializer

import logging
logger = logging.getLogger(__name__)

class RequestSubmissionHandler(generics.GenericAPIView, mixins.CreateModelMixin):
    parser_classes = [MultiPartParser, FormParser]  # Ensure file upload handling
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UnApprovedRequestSerializer

    def post(self, request: Request, *args, **kwargs):
        try:
            with transaction.atomic():  # Start a database transaction to ensure atomicity
                # Make a mutable copy of request.data to avoid immutability issues
                data = request.data.copy()  

                # Validate request data using the serializer
                serializer = self.validate_request_data(data, request)

                # Fetch the request type (additional logic can be added here)
                request_type = self.get_request_type(data)

                # Step 1: Upload and save the new document along with its version
                file_to_approve = self.check_duplicate_data(request)
                # file_to_approve = self.upload_new_document_with_version(request)
                
                # Step 2: Save the request with the uploaded document version
                self.save_request(serializer, request.user, request_type, file_to_approve)

        except PostExceptionHandler as exc:
            return Response({"message": exc.message, "error_code": exc.error_type, "status_code": exc.status_code}, status=400)
        else:
            return Response({
                'status_code': 201,
                'statusText': "Request successfully submitted",
                'data': serializer.data
            }, status=status.HTTP_201_CREATED)

    def upload_new_document_with_version(self, request):
         # Get uploaded file
        file_to_approve = request.FILES.get('file_for_approval')
        
        # Create Document Information
        document_data = {
            "document_name": file_to_approve.name,
            "created_by": request.user
        }
        document_serializer = CreateDocumentInformationSerializer(
            data=document_data,
            context={'request': request}
        )
        if not document_serializer.is_valid(raise_exception=True):
            raise PostExceptionHandler(message="Invalid Document Data", error_type='INVALID')

        document = document_serializer.save()     
        
        if not file_to_approve:
            raise PostExceptionHandler(message="No file uploaded", error_type='INVALID')

        # Create Document Version
        document_version_data = {
            'document': document.document_information_id,
            'document_name': file_to_approve.name,
            'uploaded_file': file_to_approve,
            'folder': request.data.get('folder')
        }
        document_version_serializer = DocumentVersionSerializer(
            data=document_version_data,
            context={'request': request}
        )
        if document_version_serializer.is_valid(raise_exception=True):
            document_version = document_version_serializer.save()
            document.current_version = document_version
            document.save()
            return document_version
        else:
            raise PostExceptionHandler(message="Invalid Document Version", error_type='INVALID')

    def save_request(self, serializer, requesting_user, request_type, document_version):
        serializer.save(requesting_user=requesting_user, file_for_approval=document_version, request_type=request_type, )

    def check_duplicate_data(self, request):
        # File handling remains the same
        file_to_approve = request.FILES.get('file_for_approval')
        if not file_to_approve:
            raise PostExceptionHandler(message="No file uploaded", error_type="no_file", status_code=402)

        # Check for a duplicate based on file name
        file_name = file_to_approve.name
        if DocumentVersion.objects.filter(document_name=file_name).exists():
            raise PostExceptionHandler(message="File with this name already exists", error_type="DUPLICATE_FILE_FOUND", status_code=404)

        return file_to_approve

    def validate_request_data(self, data, request):
        # Ensure you're passing the mutable 'data'
        serializer = self.serializer_class(data=data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        return serializer

    def get_request_type(self, data):
        # Safely fetch request_type from the mutable 'data'
        protocol_name = data.get('request_type')
        if not protocol_name:
            raise PostExceptionHandler("Request type is required")
        return WorkFlowProtocolModel.objects.filter(protocol_id=protocol_name).first()
    
  


        

            
                    










                    

