from rest_framework import views, status
from rest_framework.request import Request
from rest_framework.response import Response
from dmsmodule.file_mangement.models.models import  UploadedDocumentModel
from backend.dmsmodule.file_mangement.serializers.get_document_serializer import GetDocumentSerializer

class GetDocumentRequestHandler(views.APIView):
    def get(self, request:Request, folder_identifier=None):
        if folder_identifier:
            documents = UploadedDocumentModel.objects.filter(folder_identifier=folder_identifier)
        else:
            documents = UploadedDocumentModel.objects.all()
        serializer = GetDocumentSerializer(documents, many=True, context={'request': request})
        return Response(serializer.data)