from django.db import transaction
from rest_framework import generics, permissions, status,mixins, viewsets, views
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.request import Request
from rest_framework.response import Response
from workflow_manager.serilizers.send_request_serializer import UnApprovedRequestSerializer
from utils.custom_exception_handler import PostExceptionHandler
from workflow_manager.models.workflow_protocol_model import WorkFlowProtocolModel
from rest_framework.parsers import FormParser, MultiPartParser
from dmsmodule.document_repository.models import *
from decimal import Decimal
from django.core.files.uploadedfile import InMemoryUploadedFile



import logging
logger = logging.getLogger(__name__)

# class RequestSubmissionHandler(generics.GenericAPIView, mixins.CreateModelMixin):
#     parser_classes = [MultiPartParser, FormParser]  # Ensure file upload handling
#     authentication_classes = [JWTAuthentication]
#     permission_classes = [permissions.IsAuthenticated]
#     serializer_class = UnApprovedRequestSerializer

#     def post(self, request, *args, **kwargs):
#         try:
#             with transaction.atomic():  # Start a database transaction to ensure atomicity
#                 data = request.data.copy()  # Make a mutable copy of request.data

#                 # Validate request data using the serializer
#                 serializer = self.validate_request_data(data, request)

#                 # Get the request type (optional custom logic)
#                 request_type = self.get_request_type(data)

#                 # Handle the file upload
#                 file_to_approval = request.FILES.get('file_for_approval')
#                 if not file_to_approval:
#                     raise PostExceptionHandler(message="No file uploaded", error_type="no_file", status_code=402)

#                 # Step 1: Create or update the document and its version
#                 document_version = self.create_document(serializer.validated_data, request, file_to_approval)

#                 # Step 2: Save the request with the uploaded document version
#                 self.save_request(serializer, request.user, request_type, document_version)

#         except PostExceptionHandler as exc:
#             return Response({
#                 "message": exc.message, 
#                 "error_code": exc.error_type, 
#                 "status_code": exc.status_code
#             }, status=400)
#         except Exception as exc:
#             return Response({"message": str(exc), "status_code": 500}, status=500)
#         else:
#             return Response({
#                 'status_code': 201,
#                 'statusText': "Request successfully submitted",
#             }, status=status.HTTP_201_CREATED)

#     def create_document(self, validated_data, request, file_to_approval):
#         # Extract metadata and version data
#         metadata_data = validated_data.pop('metadata', None)
#         current_version_data = validated_data.pop('current_version', None)

#         # Retrieve or create the document
#         document_name = validated_data.get('title')
#         document, created = DocumentModel.objects.get_or_create(
#             document_name=document_name,
#             defaults={'created_by': request.user}
#         )

#         # Create the document version
#         if current_version_data:
#             latest_version = DocumentVersionModel.objects.filter(document=document).order_by('-version_number').first()
#             next_version_number = (latest_version.version_number + Decimal(0.1)) if latest_version else Decimal('1.0')

#             current_version = DocumentVersionModel.objects.create(
#                 document=document,
#                 version_number=next_version_number,
#                 uploaded_by=request.user,
#                 uploaded_file=file_to_approval,
#                 **current_version_data
#             )

#             # Set the current version of the document
#             document.current_version = current_version
#             document.save()
#         else:
#             raise PostExceptionHandler(message="No version data provided", error_type="EMPTY")

#         # Save metadata if provided
#         if metadata_data:
#             for meta_data in metadata_data:
#                 DocumentMetadataModel.objects.create(document_metadata=document, **meta_data)

#         return current_version

#     def save_request(self, serializer, requesting_user, request_type, document_version):
#         serializer.save(
#             requesting_user=requesting_user, 
#             file_for_approval=document_version, 
#             request_type=request_type
#         )

#     def validate_request_data(self, data, request):
#         serializer = self.serializer_class(data=data, context={'request': request})
#         serializer.is_valid(raise_exception=True)
#         return serializer

#     def get_request_type(self, data):
#         # Safely fetch request_type from the mutable 'data'
#         protocol_name = data.get('request_type')
#         if not protocol_name:
#             raise PostExceptionHandler("Request type is required")
#         return WorkFlowProtocolModel.objects.filter(protocol_id=protocol_name).first()
    
# class RequestSubmissionHandler(generics.CreateAPIView):
#     parser_classes = [MultiPartParser, FormParser]  # Ensure file upload handling
#     authentication_classes = [JWTAuthentication]
#     permission_classes = [permissions.IsAuthenticated]
#     serializer_class = UnApprovedRequestSerializer

#     def post(self, request, *args, **kwargs):
#         try:
#             with transaction.atomic():  # Start a database transaction to ensure atomicity
#                 # Make a mutable copy of request.data to avoid immutability issues
#                 data = request.data.copy()

#                 # Validate request data using the serializer
#                 serializer = self.validate_request_data(data, request)

#                 # Fetch the request type (additional logic can be added here)
#                 request_type = self.get_request_type(data)

#                 # Step 1: Upload and save the new document along with its version
              

#                 # Step 2: Save the request with the uploaded document version
#                 self.save_request(serializer, request.user, request_type)

#         except PostExceptionHandler as exc:
#             return Response({"message": exc.message, "error_code": exc.error_type, "status_code": exc.status_code}, status=400)
#         else:
#             return Response({
#                 'status_code': 201,
#                 'statusText': "Request successfully submitted",
#             }, status=status.HTTP_201_CREATED)


#     # def upload_new_document_with_version(self, request):
#     #     # Get uploaded file
#     #     file_to_approve = request.FILES.get('file_for_approval')

#     #     if not file_to_approve:
#     #         raise PostExceptionHandler(message="No file uploaded", error_type='INVALID')

#     #     # Create Document Version
#     #     document_version_data = {
#     #         'uploaded_file': file_to_approve
#     #     }
#     #     document_version_serializer = CreateDocumentSerializer(
#     #         data=document_version_data,
#     #         context={'request': request}
#     #     )

#     #     if document_version_serializer.is_valid(raise_exception=True):
#     #         document_version = document_version_serializer.save()
#     #         return document_version
#     #     else:
#     #         raise PostExceptionHandler(message="Invalid Document Version", error_type='INVALID')

#     def save_request(self, serializer, requesting_user, request_type):
#         # Pass the document_version to the serializer as well
#         instance = serializer.save(
#             requesting_user=requesting_user, 
#             # file_for_approval=document_version, 
#             request_type=request_type
#         )

#         # Serialize the saved instance
#         response_serializer = UnApprovedRequestSerializer(instance)
        
#         return Response(response_serializer.data, status=status.HTTP_201_CREATED)

#     def validate_request_data(self, data, request):
#         # Ensure you're passing the mutable 'data'
#         serializer = self.serializer_class(data=data, context={'request': request})
#         serializer.is_valid(raise_exception=True)
#         return serializer

#     def get_request_type(self, data):
#         # Safely fetch request_type from the mutable 'data'
#         protocol_name = data.get('request_type')
#         if not protocol_name:
#             raise PostExceptionHandler("Request type is required")
#         return WorkFlowProtocolModel.objects.filter(protocol_id=protocol_name).first()


# class RequestSubmissionHandler(views.APIView):
#     """
#     Handles GET and POST requests for unapproved requests.
#     """

#     def get(self, request):
#         """
#         Retrieve a list of unapproved requests.
#         """
#         unapproved_requests = UnApprovedRequestByOwnerModel.objects.all()
#         serializer = UnApprovedRequestSerializer(unapproved_requests, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)

#     def post(self, request):
#         """
#         Create a new unapproved request.
#         """
#         serializer = UnApprovedRequestSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class RequestSubmissionHandler(generics.GenericAPIView):
    parser_classes = [MultiPartParser, FormParser]
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UnApprovedRequestSerializer

    def post(self, request, *args, **kwargs):
        try:
            # Make a mutable copy of request.data to avoid immutability issues
            data = request.data.copy()  

            # Pass mutable data to the validate_request_data method
            serializer = self.validate_request_data(data, request)
            
            # Fetch request type and check for duplicate file
            request_type = self.get_request_type(data)

            file_to_approve = self.check_duplicate_data(request)
            # Save the request
            self.save_request(serializer, request.user, request_type, file_to_approve)

        except PostExceptionHandler as exc:
            return Response({"message": exc.message, "error_code": exc.error_type, "status_code": exc.status_code}, status=400)
        else:
            return Response({'status_code': 201, 'statusText': "Request successfully submitted", 'data': serializer.data}, status=status.HTTP_201_CREATED)
        
    # def check_duplicate_data(self, files, user):
    #     file_versions = []

    #     for file_to_approve in files:
    #         if not isinstance(file_to_approve, InMemoryUploadedFile):
    #             raise ValueError("Invalid file upload.")

    #         file_name = file_to_approve.name
            
    #         # Check for existing document by name
    #         existing_document = DocumentModel.objects.filter(document_name=file_name).first()

    #         if existing_document:
    #             document = existing_document
    #         else:
    #             # Create a new document if it doesn't exist
    #             document = DocumentModel.objects.create(
    #                 document_name=file_name,
    #                 created_by=user
    #             )

    #         # Create a new version for the uploaded file
    #         current_version = DocumentVersionModel.objects.create(
    #             document=document,
    #             version_number=(DocumentVersionModel.objects.filter(document=document).count() + 1),
    #             uploaded_file=file_to_approve,
    #             uploaded_by=user,
    #             is_current=True
    #         )

    #         file_versions.append(current_version)

    #     return file_versions  # Return the list of DocumentVersionModel instances




    def check_duplicate_data(self, request):
        file_to_approve = request.FILES.get('file_for_approval')
        if not file_to_approve:
            raise PostExceptionHandler(message="No file uploaded", error_type="no_file", status_code=402)

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

    def get_request_type(self, data):
        # Safely fetch request_type from the mutable 'data'
        protocol_name = data.get('request_type')
        if not protocol_name:
            raise PostExceptionHandler("Request type is required")
        return WorkFlowProtocolModel.objects.filter(protocol_id=protocol_name).first()


    # def save_request(self, serializer, requesting_user, request_type, file_versions):
    #     # Save the main request object
    #     request_instance = serializer.save(
    #         requesting_user=requesting_user,
    #         request_type=request_type,
    #     )

    #     # Associate all file versions with the request
    #     for file_version in file_versions:
    #         request_instance.file_for_approval.add(file_version)




    def save_request(self, serializer, requesting_user, request_type, file_to_approve):
        # Save using mutable 'data'
        serializer.save(
            requesting_user=requesting_user,
            request_type=request_type,
            file_for_approval=file_to_approve
        )

                    








   # def check_duplicate_data(self, request):
    #     file_to_approve = request.FILES.get('file_for_approval')
    #     if not file_to_approve:
    #         raise PostExceptionHandler(message="No file uploaded", error_type="no_file", status_code=402)

    #     file_name = file_to_approve.name

    #     with transaction.atomic():
    #         existing_document = DocumentModel.objects.filter(document_name=file_name).first()

    #         if not existing_document:
    #             existing_document = DocumentModel.objects.create(
    #                 document_name=file_name,
    #                 created_by=request.user
    #             )
    #             print(f"Document created: {existing_document}")

    #         # Create a new DocumentVersionModel instance
    #         document_version = DocumentVersionModel.objects.create(
    #             document=existing_document,
    #             uploaded_file=file_to_approve.name,
    #             uploaded_by=request.user,
    #             is_current=True
    #         )
    #         print(f"Document Version created: {document_version}")

    #     return document_version

                    

