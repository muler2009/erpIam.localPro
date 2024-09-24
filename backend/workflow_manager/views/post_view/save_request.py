from rest_framework import generics, status, serializers
from rest_framework.response import Response
from dmsmodule.document_repository.models.document_version_control import DocumentVersionModel
from ...models.request_model import UnApprovedRequestByOwnerModel


class DocumentVersionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentVersionModel
        fields = ['document_version_id', 'uploaded_file', 'version_number']


class RequestSendSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()
    file_name = serializers.SerializerMethodField()
    file_for_approval = DocumentVersionSerializer(many=True, read_only=True)  # Use nested serializer for the files

    class Meta:
        model = UnApprovedRequestByOwnerModel
        fields = [
            'request_id', 
            'title', 
            'request_sent_at', 
            'request_updated_at', 
            'file_for_approval', 
            'file_url', 
            'file_name',   
        ]
        extra_kwargs = {
            'request_id': {'read_only': True},
            'request_sent_at': {'read_only': True},
            'request_updated_at': {'read_only': True}
        }

    def get_file_url(self, obj):
        request = self.context.get('request')
        if request and obj.file_for_approval.exists():
            return [request.build_absolute_uri(file.uploaded_file.url) for file in obj.file_for_approval.all()]
        return None

    def get_file_name(self, obj):
        if obj.file_for_approval.exists():
            return [file.document.document_name for file in obj.file_for_approval.all()]
        return None

class FileUploadSerializer(serializers.Serializer):
    file_for_approval = serializers.ListField(
        child=serializers.FileField(),
        allow_empty=False,
        write_only=True
    )

    def create(self, validated_data):
        files = validated_data.pop('file_for_approval')
        document_versions = []
        user = self.context['request'].user  # Assume the user is passed in context

        for file in files:
            document_version = DocumentVersionModel.objects.create(
                uploaded_file=file,
                uploaded_by=user
            )
            document_versions.append(document_version)

        return document_versions



class SaveRequestForApporval(generics.GenericAPIView):
    def get_serializer_class(self):
        from workflow_manager.serilizers.send_request_serializer import UnApprovedRequestSerializer 
        return UnApprovedRequestSerializer

    def post(self, request, *args, **kwargs):
        data = request.data.copy()
        files = request.FILES.getlist('file_for_approval')

        if not files:
            return Response({"file_for_approval": ["This field is required."]}, status=status.HTTP_400_BAD_REQUEST)

        # Adjust data if necessary to include multiple files, depending on your serializer
        data['file_for_approval'] = files
        serializer_class = self.get_serializer_class()  # Get the serializer class
        serializer = serializer_class(data=data, context={'request': request})

        if serializer.is_valid():
            request_instance = serializer.save()

            # Save each file as a DocumentVersionModel instance
            for file in files:
                DocumentVersionModel.objects.create(
                    document=request_instance,  # Adjust based on your relationships
                    uploaded_file=file,
                    uploaded_by=request.user,
                )

            return Response({'message': 'Request created successfully', 'data': serializer.data}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)