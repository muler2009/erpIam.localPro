from rest_framework import views, serializers
from rest_framework.request import Request
from rest_framework.response import Response
from dmsmodule.file_mangement.models.document_uploads_models import DocumentVersion
from dmsmodule.file_mangement.models.document_information import DocumentInformation
# from dmsmodule.file_mangement.serializers.document_info_serializer import DocumentInformationSerializer

# class DocumentVersionSerializer(serializers.ModelSerializer):
#     file_url = serializers.SerializerMethodField()
#     file_name = serializers.SerializerMethodField()
#     file_for_approval = serializers.FileField(write_only=True, required=False)

#     class Meta:
#         model = DocumentVersion
#         fields = [
#             'document_id',
#             'document_name', 
#             'uploaded_file', 
#             'version_number', 
#             'uploaded_file_date', 
#             'folder',
#             'file_url',
#             'file_name',
#             'file_for_approval'
#         ]
#         extra_kwargs = {
#             'document_id': {'read_only': True},
#             'updated_file_date': {'read_only': True}
#         }

#     def get_file_url(self, obj):
#         request = self.context.get('request')
#         if request is None:
#             return None
#         if obj.uploaded_file and hasattr(obj.uploaded_file, 'url'):
#             return request.build_absolute_uri(obj.uploaded_file.url)
#         return None

    # def create(self, validated_data):
    #     # Extract the file_for_approval directly from validated_data
    #     file_for_approval = validated_data.pop('file_for_approval', None)

    #     if file_for_approval:
    #         # Directly use file_for_approval to get the file attributes
    #         file_instance = DocumentVersion.objects.create(
    #             document_name=file_for_approval.name,  # Use file name here
    #             uploaded_file=file_for_approval
    #         )
            
    #         validated_data['file_for_approval'] = file_instance

    #     # Create the request instance using the parent class's create method
    #     return super().create(validated_data)
    

class DocumentVersionSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()
    file_name = serializers.SerializerMethodField()
    file_for_approval = serializers.FileField(write_only=True, required=False)
   
   
    class Meta:
        model = DocumentVersion
        fields = [ 
            'document_id',
            'document_name', 
            'uploaded_file', 
            'version_number', 
            'uploaded_file_date', 
            'document',
            'folder',
            'file_url',
            'file_name',
            'file_for_approval',
        ]
        
        extra_kwargs = {
            'document_id': {'read_only': True},
            'uploaded_file_date': {'read_only': True}  # Fix typo here: it was 'updated_file_date'
        }   


    def get_document(self, obj):
        # Use a lazy import to avoid circular imports
        from dmsmodule.file_mangement.serializers.document_info_serializer import DocumentInformationSerializer
        return DocumentInformationSerializer(obj.document).data

    def get_file_url(self, obj):
        request = self.context.get('request')
        if obj.uploaded_file and hasattr(obj.uploaded_file, 'url'):
            return request.build_absolute_uri(obj.uploaded_file.url)
        return None
    
    def get_file_name(self, obj):
        return obj.uploaded_file.name if obj.uploaded_file else None
            
    def create(self, validated_data):
        file_to_approval = validated_data.get('uploaded_file')
        if not file_to_approval:
            raise serializers.ValidationError("No file provided")
            
        document_version = DocumentVersion.objects.create(
            document=validated_data.get('document'),
            document_name=file_to_approval.name,
            uploaded_file=file_to_approval,
            folder=validated_data.get('folder')
        )

        return document_version
    

  # def create(self, validated_data):
    #     document_data = validated_data.pop('document', None)
    #     file_to_approval = validated_data.pop('file_for_approval', None)
    #     folder = validated_data.pop('folder', None)
        
    #     if file_to_approval:
    #         # Handle the document information if provided
    #         document = None
    #         if document_data:
    #             from dmsmodule.file_mangement.serializers.document_info_serializer import DocumentInformationSerializer
    #             document_serializer = DocumentInformationSerializer(data=document_data)
    #             document_serializer.is_valid(raise_exception=True)
    #             document = document_serializer.save()
            
    #         # Create the DocumentVersion instance
    #         document_version = DocumentVersion.objects.create(
    #             document=document,
    #             document_name=file_to_approval.name,
    #             uploaded_file=file_to_approval,
    #             folder=folder
    #         )
    #         return document_version
    #     else:
    #         raise serializers.ValidationError("No file provided")







    # def get_file_url(self, obj):
    #     request = self.context.get('request')
    #     if request is None:
    #         return None
    #     if obj.uploaded_file and hasattr(obj.uploaded_file, 'url'):
    #         return request.build_absolute_uri(obj.uploaded_file.url)
    #     return None

    # def get_file_name(self, obj):
    #     # Return the name of the uploaded file
    #     if obj.uploaded_file:
    #         return obj.uploaded_file.name
    #     return None

    # def create(self, validated_data):
    #     # Extract the file_for_approval directly from validated_data
    #     file_for_approval = validated_data.pop('file_for_approval', None)

    #     # Create a new DocumentVersion instance
    #     document_version = DocumentVersion.objects.create(
    #         document_name=validated_data.get('document_name'),
    #         uploaded_file=file_for_approval,
    #         version_number=validated_data.get('version_number', 1.0),  # Default to 1.0 if not provided
    #         folder=validated_data.get('folder')
    #     )

    #     return document_version



