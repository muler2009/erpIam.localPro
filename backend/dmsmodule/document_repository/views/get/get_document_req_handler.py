from rest_framework import status, generics
from ...models.document import DocumentModel
from ...serializer.get_serializer.get_document_serializer import DocumentSerializerModel

class GetDocumentRequestHandler(generics.ListAPIView): 
    queryset = DocumentModel.objects.all()
    serializer_class = DocumentSerializerModel