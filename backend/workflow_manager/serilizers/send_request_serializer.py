from rest_framework import serializers
import os
from workflow_manager.models.request_model import  UnApprovedRequestByOwnerModel, ApprovedRequestByRequestOwnerModel
from iam.models import UserAccountsModel
from workflow_manager.models.workflow_state_model import WorkFlowStateModel
from workflow_manager.models.workflow_protocol_model import WorkFlowProtocolModel
from dmsmodule.file_mangement.models.document_uploads_models import DocumentVersion
from dmsmodule.helper.file_extension_validator import FileExtensionValidator
from dmsmodule.file_mangement.serializers.document_version_serialzier import DocumentVersionSerializer
from dmsmodule.document_repository.serializer.create_serializer.create_document_serializer import CreateDocumentSerializer
from dmsmodule.document_repository.models.document_version_control import DocumentVersionModel

import logging

logger = logging.getLogger(__name__)
    # def create(self, validated_data):
    #     # Assuming the document version has already been created and passed into this method
    #     document_version = validated_data.pop('file_for_approval', None)

    #     if document_version:
    #         # Link the created DocumentVersion instance
    #         validated_data['file_for_approval'] = document_version

    #     # Create the UnApprovedRequest instance
    #     return super().create(validated_data)

    # def create(self, validated_data):
    #     file_to_approval = validated_data.pop('file_for_approval', None)
    #     request = self.context.get('request') 
    #     if file_to_approval:
    #         # Create the DocumentVersion instance
    #         document_version = DocumentVersionModel.objects.create(
    #             # document_name=file_to_approval.name,
    #             uploaded_file=file_to_approval,
    #             uploaded_by=request.user,
    #             version_number=1.0  # Set the version number
    #         )
    #         document_version.save()

    #         validated_data['file_for_approval'] = document_version

    #     # Create the UnApprovedRequest instance
    #     return super().create(validated_data)

class RequestSendSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()
    file_name = serializers.SerializerMethodField()
    file_for_approval = serializers.FileField(required=True)

    class Meta:
        model = UnApprovedRequestByOwnerModel  # Use the concrete model here
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
        if request and obj.file_for_approval and hasattr(obj.file_for_approval.uploaded_file, 'url'):
            return request.build_absolute_uri(obj.file_for_approval.uploaded_file.url)
        return None

    def get_file_name(self, obj):
        if obj.file_for_approval:
            return obj.file_for_approval.document.document_name if obj.file_for_approval.uploaded_file else None
        return None
   

    # def create(self, validated_data):
    #     file_for_approval = validated_data.pop('file_for_approval', None)
    #     # Check that file_for_approval is actually included in validated_data
    #     if not file_for_approval:
    #         raise serializers.ValidationError({"file_for_approval": "This field is required."})
        
    #     # Create the DocumentVersion instance
    #     file_instance = DocumentVersionModel.objects.create(
    #         uploaded_file=file_for_approval['uploaded_file'],
    #         uploaded_by=self.context['request'].user
    #         # Include any other necessary fields...
    #     )
    #     validated_data['file_for_approval'] = file_instance
        
    #     return super().create(validated_data)
        



class UnApprovedRequestSerializer(RequestSendSerializer):
    requesting_user = serializers.SerializerMethodField()
    request_assigned_to_user = serializers.SerializerMethodField()
    request_type = serializers.SerializerMethodField()

    class Meta(RequestSendSerializer.Meta): 
        model = UnApprovedRequestByOwnerModel  # Specify the concrete model here
        fields = RequestSendSerializer.Meta.fields + [
            'approval_status', 
            'requesting_user', 
            'request_assigned_to_user', 
            'request_type'
        ]

    def get_requesting_user(self, obj):
        return obj.requesting_user.username if obj.requesting_user else None
    
    def get_request_assigned_to_user(self, obj):
        return obj.request_assigned_to_user.username if obj.request_assigned_to_user else None
    
    def get_request_type(self, obj):
        return obj.request_type.protocol_name if obj.request_type else None

    def to_internal_value(self, data):
        # Convert request_type from name to ID
        if 'request_type' in data:
            try:
                data['request_type'] = WorkFlowProtocolModel.objects.get(protocol_name=data['request_type']).pk
            except WorkFlowProtocolModel.DoesNotExist:
                raise serializers.ValidationError({"request_type_name": "Invalid request type name"})
        return super().to_internal_value(data)  


class ApprovedRequestsByRequestSerializer(RequestSendSerializer):
    current_state = serializers.SerializerMethodField()
    requesting_user = serializers.SerializerMethodField()
    request_assigned_to_user = serializers.SerializerMethodField()
    request_type = serializers.SerializerMethodField()
    
    # Assuming the file_url and file_name are methods inherited from RequestSendSerializer
    # No need to redefine them unless their logic differs for the approved requests.

    class Meta(RequestSendSerializer.Meta):
        model = ApprovedRequestByRequestOwnerModel  # Ensure this model has the file field populated correctly
        fields = RequestSendSerializer.Meta.fields + [
            'current_state', 
            'requesting_user', 
            'request_assigned_to_user', 
            'request_type'
        ]

    def get_requesting_user(self, obj):
        return obj.requesting_user.username

    def get_current_state(self, obj):  # Corrected the method parameter name
        return obj.current_state.state_name

    def get_request_assigned_to_user(self, obj):
        return obj.request_assigned_to_user.username if obj.request_assigned_to_user else None

    def get_request_type(self, obj):
        return obj.request_type.protocol_name if obj.request_type else None

    def to_internal_value(self, data):
        # Override this method to convert the request_type name to its ID
        if 'request_type' in data:
            try:
                data['request_type'] = WorkFlowProtocolModel.objects.get(protocol_name=data['request_type']).pk
            except WorkFlowProtocolModel.DoesNotExist:
                raise serializers.ValidationError({"request_type_name": "Invalid request type name"})
        return super().to_internal_value(data)

     

   
