from rest_framework import serializers
from ...models.document import DocumentModel
from ...models.document_metadata import DocumentMetadataModel
from ...models.document_version_control import DocumentVersionModel
from ...serializer.create_serializer.create_document_version_serializer import CreateDocumentVersionSerializer 
from ...serializer.get_serializer.get_document_metadata_serializer import GetDocumentSerializer 
from dmsmodule.folder.models.models import FolderModel
from decimal import Decimal
import os
from django.conf import settings

class CreateDocumentSerializer(serializers.ModelSerializer):
    created_by = serializers.SerializerMethodField()
    metadata = GetDocumentSerializer(required=False) 
    folder = serializers.CharField(required=False, allow_blank=True)
    current_version = CreateDocumentVersionSerializer()
    document_name = serializers.CharField(required=False, allow_blank=True) 
    
    def get_created_by(self, object):
        return object.created_by.username if object.created_by.username else None
    
    class Meta:
        model = DocumentModel
        fields = [
            'document_information_id', 
            'document_name', 
            'current_version', 
            'created_by', 
            'created_at', 
            'folder', 
            'metadata'
        ]

        read_only_fields = ['current_version', 'created_at', 'created_by']

    def get_current_version(self, obj):
        if obj.current_version:
            serializer = CreateDocumentVersionSerializer(obj.current_version)
            return serializer.data
        return None
    
    def get_or_create_folder(self, folder_name):
        """
        Helper method to get or create a folder based on the folder name.
        This keeps the folder logic separate and reusable.
        """
        if folder_name:
            folder, created = FolderModel.objects.get_or_create(folder_name=folder_name)
            return folder
        return None
    
    def validate_current_version(self, value):
        if not value or not value.get('uploaded_file'):
            raise serializers.ValidationError("Uploadeed file is requeired")
        return value
    
    def get_document_name(self, validated_data, current_version_data):
         # Define unique fields to identify an existing document
        document_name = validated_data.get('document_name')
         # Check if document_name is None and we have current_version data
        if document_name is None and current_version_data and 'uploaded_file' in current_version_data:
            # Extract the file name from the uploaded file
            uploaded_file = current_version_data['uploaded_file']
            file_name, ext = os.path.splitext(os.path.basename(uploaded_file.name))  # Extract filename without path
            document_name = file_name  # Use the file name as the document name

        return document_name


    def create(self, validated_data):
        # Extract nested metadata and versions data
        metadata_data = validated_data.pop('metadata', None)
        current_version_data = validated_data.pop('current_version', None)

        folder_name = validated_data.pop('folder', None)
        folder = self.get_or_create_folder(folder_name)

       
        document_name = self.get_document_name(validated_data, current_version_data)
        # Try to get an existing document based on unique fields
        existing_document = None
        if document_name: 
            existing_document = DocumentModel.objects.filter(document_name=document_name, folder=folder).first()

        if existing_document:
            # If the document exists, use it
            document = existing_document
        else:
            # If the document does not exist, create a new one
            document = DocumentModel.objects.create(
                document_name=document_name,
                created_by=self.context['request'].user,  # Assuming you're using request.user for created_by
                folder=folder
            )

        # Check if we have current version data
        if current_version_data:
            # Fetch the latest version for the document
            latest_version = DocumentVersionModel.objects.filter(document=document).order_by('-version_number').first()

            # Calculate the next version number
            next_version_number = latest_version.version_number + Decimal(0.1) if latest_version else 1.0

            # Create new document version with the incremented version number
            current_version = DocumentVersionModel.objects.create(
                document=document,
                version_number=next_version_number,  # Set the next version number
                uploaded_by=self.context['request'].user,
                **current_version_data  # Additional version-related fields (like file)
            )

            # If the document is newly created, set the first version as current_version
            if not existing_document:
                document.current_version = current_version  # Set the first version for a new document

            # Set the created version as the current version of the document
            document.current_version = current_version

            document.save()


        # Handle the creation or update of a single metadata record for this document
        if metadata_data:
            # Try to get existing metadata for this document
            metadata_instance, created = DocumentMetadataModel.objects.update_or_create(
                document_metadata=document,  # Unique constraint field
                defaults=metadata_data  # Update metadata fields
            )
    
        return document
    