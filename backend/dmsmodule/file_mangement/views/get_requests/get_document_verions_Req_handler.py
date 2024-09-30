from rest_framework import generics
from ...serializers.document_info_serializer import DocumentInformationSerializer
from ...serializers.get_document_serializer import GetDocumentSerializer
from ...models.document_uploads_models import DocumentVersion
from ...models.document_information import DocumentInformation

class GetDocumentVerisonRequestHandler(generics.ListAPIView):
    queryset = DocumentInformation.objects.all()
    serializer_class = DocumentInformationSerializer 