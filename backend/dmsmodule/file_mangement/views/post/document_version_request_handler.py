from rest_framework import status, generics, serializers, mixins, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.request import Request
from utils.custom_exception_handler import CustomExceptionForError
from ...models.document_uploads_models import DocumentVersion
from ...models.document_information import DocumentInformation
from ...serializers.document_version_serialzier import DocumentVersionSerializer

class DocumentVersionRequestHandler(generics.GenericAPIView, mixins.CreateModelMixin):
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser]
    serializer_class = DocumentVersionSerializer

    def post(self, request, *args, **kwargs):
        try:
            # Try to get the document
            document = DocumentInformation.objects.get(document_information_id=kwargs['document_id'])

            # Validate request data
            serializer = self.validate_request_data(request)

            # Create a new document version
            return self.create_document(serializer, document, request)

        except DocumentInformation.DoesNotExist:
            return Response(
                {"message": "Document not found", "error_type": "DOCUMENT_NOT_FOUND"},
                status=status.HTTP_404_NOT_FOUND
            )

        except CustomExceptionForError as exception:
            return Response(
                {
                    "message": exception.message,
                    "error_type": exception.error_type
                },
                status=status.HTTP_400_BAD_REQUEST
            )
    
    def validate_request_data(self, request):
        # Ensure that the data is validated with the correct serializer
        serializer = self.serializer_class(data=request.data, context={'request': request})
        if not serializer.is_valid():
            raise CustomExceptionForError(message="Invalid data provided", error_type="NOT_VALID_DATA")
        return serializer

    def create_document(self, serializer, document, request):
        # Get the latest version and increment the version number
        latest_version = DocumentVersion.objects.filter(document=document).order_by('-version_number').first()
        version_number = latest_version.version_number + 1 if latest_version else 1

        # Create the new version of the document
        version = DocumentVersion.objects.create(
            document=document,
            version_number=version_number,
            uploaded_file=request.FILES['uploaded_file'],
            # uploaded_by=request.user  # Assuming authentication is required
        )

        # Update the current version in the document
        document.current_version = version
        document.save()

        # Return the newly created version data
        return Response(
            {'data': DocumentVersionSerializer(version).data}, 
            status=status.HTTP_201_CREATED
        )
