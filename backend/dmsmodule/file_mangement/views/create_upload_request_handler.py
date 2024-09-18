from rest_framework import views, status, generics
from rest_framework.response import Response
from dmsmodule.file_mangement.serializers.document_version_serialzier import DocumentVersionSerializer 

class UploadDocumentView(generics.GenericAPIView):
    def post(self, request):
        serializer = DocumentVersionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)