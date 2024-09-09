from rest_framework import serializers, views, generics
from rest_framework.response import Response
from dmsmodule.file_mangement.models.document_uploads_models import DocumentVersion
from dmsmodule.file_mangement.serializers.get_document_serializer import GetDocumentSerializer

class GetDocumentRequestHandler(generics.GenericAPIView):
    def get(self, request, folder_identifier=None):
        if folder_identifier:
            documents = DocumentVersion.objects.filter(folder_identifier=folder_identifier)
        else:
            documents = DocumentVersion.objects.all()
        serializer = GetDocumentSerializer(documents, many=True, context={'request': request})
        return Response(serializer.data)