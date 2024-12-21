from django.db import transaction
from rest_framework import generics, permissions, status,mixins, viewsets, views
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.request import Request
from rest_framework.response import Response
from workflow_service.serializers.create.saved_request_serializer import SaveRequestSerializer
from utils.custom_exception_handler import CustomExceptionForError
from workflow_service.models.approval_process import ApprovalProcessModel
from rest_framework.parsers import FormParser, MultiPartParser
from dmsmodule.document_repository.models import *
from decimal import Decimal

class SaveRequestHandler(generics.CreateAPIView, mixins.CreateModelMixin):
    parser_classes = [MultiPartParser, FormParser]
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SaveRequestSerializer

    def post(self, request, *args, **kwargs):
        try:
            # Make a mutable copy of request.data to avoid immutability issues
            data = request.data.copy()  

            # Pass mutable data to the validate_request_data method
            serializer = self.validate_request_data(data, request)
            
            # Fetch request type and check for duplicate file
            approval_process = self.get_approval_process_type(data)

            file_to_approve = self.check_duplicate_data(request)
            # Save the request
            self.save_request(serializer, request.user, approval_process, file_to_approve)

        except CustomExceptionForError as exc:
            return Response({"message": exc.detail, "error_code": exc.default_code, "status_code": exc.status_code}, status=400)
        else:
            return Response({'status_code': 201, 'statusText': "Request successfully submitted", 'data': serializer.data}, status=status.HTTP_201_CREATED)
        

    def check_duplicate_data(self, request):
        file_to_approve = request.FILES.get('file_for_approval')
        if not file_to_approve:
            raise CustomExceptionForError(detail="No file uploaded", error_type="no_file", status_code=402)

        # Get the file name
        file_name = file_to_approve.name
        # Define unique fields to identify an existing document
        existing_document = DocumentModel.objects.filter(document_name=file_name).first()

        if existing_document:
            document = existing_document
        else:
            # If the document does not exist, create a new one
            document = DocumentModel.objects.create(
                document_name=file_name,
                created_by=request.user 
            )

        # Check for the latest version of the document
        latest_version = DocumentVersionModel.objects.filter(document=document, is_current=True).order_by('-version_number').first()

        # Create a new version only if the file is different from the latest version
        if latest_version is None or latest_version.uploaded_file != file_to_approve:
            if latest_version:
                latest_version.is_current = False
                latest_version.save()
            
            current_version = DocumentVersionModel.objects.create(
                document=document,
                version_number=(latest_version.version_number + Decimal(0.1) if latest_version else 1.0),
                uploaded_file=file_to_approve,
                uploaded_by=request.user,
                is_current = True
            )

            document.current_version = current_version
            document.current_version_number = current_version.version_number  # Set the version number
            document.save()
        else:
            current_version = latest_version  # Use the latest version if the file hasn't changed

        return current_version  # Return the DocumentVersionModel instance
    
    
    def validate_request_data(self, data, request):
        # Ensure you're passing the mutable 'data'
        serializer = self.serializer_class(data=data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        return serializer

    def get_approval_process_type(self, data):
        # Safely fetch request_type from the mutable 'data'
        process_name = data.get('approval_process')
        if not process_name:
            raise CustomExceptionForError(detail="Request type is required")
        return ApprovalProcessModel.objects.filter(process_id=process_name).first()

    def save_request(self, serializer, requesting_user, approval_process, file_to_approve):
        # Save using mutable 'data'
        serializer.save(
            request_send_by=requesting_user,
            approval_process=approval_process,
            # approved_by=requesting_user,
            file_for_approval=file_to_approve
        )




