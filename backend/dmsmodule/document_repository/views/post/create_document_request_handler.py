from rest_framework import status, generics, mixins, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from ...models import *
from ...serializer.create_serializer.create_document_serializer import CreateDocumentSerializer

class CreateDocumentRequestHandler(generics.GenericAPIView, mixins.CreateModelMixin):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CreateDocumentSerializer
    queryset = DocumentModel.objects.all()
    parser_classes =[MultiPartParser]

    def post(self, request, *args, **kwargs):
        # Get the serializer and pass the request context
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)

        # Save the document and automatically associate the created_by field
        self.perform_create(serializer)
       
        return Response({
                "status_code": 201,
                "status_text": "Document Uploaded Successfully",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)


    def perform_create(self, serializer):
        # The request context is available via self.request
        # This ensures 'created_by' is the current user making the request
        serializer.save()

    


    