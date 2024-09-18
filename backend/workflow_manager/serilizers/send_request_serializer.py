from rest_framework import serializers
import os
from workflow_manager.models.request_model import RequestInWorkFlowModel, UnApprovedRequestByOwnerModel, ApprovedRequestByRequestOwnerModel
from iam.models import UserAccountsModel
from workflow_manager.models.workflow_state_model import WorkFlowStateModel
from workflow_manager.models.workflow_protocol_model import WorkFlowProtocolModel
from dmsmodule.file_mangement.models.document_uploads_models import DocumentVersion
from dmsmodule.helper.file_extension_validator import FileExtensionValidator
from dmsmodule.file_mangement.serializers.document_version_serialzier import DocumentVersionSerializer

import logging

logger = logging.getLogger(__name__)

class RequestSendSerializer(serializers.ModelSerializer):
  
    class Meta:
        # Use the specific model, not the abstract one
        # abstract =True
        model = UnApprovedRequestByOwnerModel
        fields = [
            'request_id', 
            'title', 
            'request_sent_at', 
            'request_updated_at', 
        ]
        
        extra_kwargs = {
            'request_id': {'read_only': True},
            'request_sent_at': {'read_only': True},
            'request_updated_at': {'read_only': True}
        }


    
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

    #     if file_to_approval:
    #         # Create the DocumentVersion instance
    #         document_version = DocumentVersion.objects.create(
    #             document_name=file_to_approval.name,
    #             uploaded_file=file_to_approval,
    #             version_number=1.0  # Set the version number
    #         )
    #         document_version.save()

    #         validated_data['file_for_approval'] = document_version

    #     # Create the UnApprovedRequest instance
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
        return obj.requesting_user.username
    
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

     

   
