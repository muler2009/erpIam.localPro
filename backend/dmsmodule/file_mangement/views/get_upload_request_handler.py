from rest_framework import serializers, views, generics
from rest_framework.response import Response
from dmsmodule.file_mangement.models.models import UploadedDocumentModel
from dmsmodule.file_mangement.serializers.get_document_serializer import GetDocumentSerializer

class GetDocumentRequestHandler(generics.GenericAPIView):
    def get(self, request, folder_identifier=None):
        if folder_identifier:
            documents = UploadedDocumentModel.objects.filter(folder_identifier=folder_identifier)
        else:
            documents = UploadedDocumentModel.objects.all()
        serializer = GetDocumentSerializer(documents, many=True, context={'request': request})
        return Response(serializer.data)