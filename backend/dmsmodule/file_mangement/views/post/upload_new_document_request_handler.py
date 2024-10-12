from rest_framework import status, generics, serializers, mixins, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.request import Request
from ...models.document_uploads_models import DocumentVersion
from ...models.document_information import DocumentInformation
from ...serializers.document_info_serializer import DocumentInformationSerializer, CreateDocumentInformationSerializer

class UploadNewDocumentRequestHndler(generics.GenericAPIView, mixins.CreateModelMixin):
    queryset = DocumentInformation.objects.all()
    serializer_class = CreateDocumentInformationSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser]

    def perform_create(self, serializer):
        # Get the authenticated user
        user = self.request.user
        # Ensure file is present in the request
        file = self.request.FILES.get('uploaded_file')
        if not file:
            raise serializers.ValidationError({"file": "No file provided"})

        # Save the initial document record
        document = serializer.save(created_by=user)
        # Create the initial version of the document
        DocumentVersion.objects.create(
            document=document,
            version_number=1.0,
            uploaded_file=file,
            # uploaded_by=user
        )

    def post(self, request, *args, **kwargs):
        # Override post method to handle file and document creation
        return self.create(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        # Handle document creation via POST request
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
