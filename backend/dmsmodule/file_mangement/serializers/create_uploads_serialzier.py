from rest_framework import views, serializers
from rest_framework.request import Request
from rest_framework.response import Response
from dmsmodule.file_mangement.models.document_uploads_models import  UploadedDocumentModel
from dmsmodule.file_mangement.serializers.get_document_serializer import GetDocumentSerializer


class UploadDocumentSeriallizer(serializers.ModelSerializer):
    class Meta:
        model = UploadedDocumentModel
        fields = ['uploaded_document_id','uploaded_document_name', 'uploaded_file', 'file_url', 'uploaded_file_date', 'updated_file_date', 'folder']


    def create(self, validated_data):
        upload_document = UploadedDocumentModel.objects.create(**validated_data)
        return upload_document