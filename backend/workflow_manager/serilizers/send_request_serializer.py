from rest_framework import serializers
import os
from workflow_manager.models.request_model import RequestInWorkFlowModel, UnApprovedRequestByOwnerModel, ApprovedRequestByRequestOwnerModel
from iam.models import UserAccountsModel
from workflow_manager.models.workflow_state_model import WorkFlowStateModel
from workflow_manager.models.workflow_protocol_model import WorkFlowProtocolModel
from dmsmodule.file_mangement.models.document_uploads_models import UploadedDocumentModel
from dmsmodule.helper.file_extension_validator import FileExtensionValidator

class RequestSendSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()
    file_name = serializers.SerializerMethodField()
    file_for_approval = serializers.FileField(write_only=True, required=False)

    class Meta:
        # Use the specific model, not the abstract one
        abstract = True
        fields = ['request_id', 'title', 'request_sent_at', 'request_updated_at', 'file_for_approval', 'file_url', 'file_name']
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
            return obj.file_for_approval.uploaded_document_name
        return None

    def create(self, validated_data):
        # Handle file creation and linking to the model
        file_for_approval = validated_data.pop('file_for_approval', None)
        
        if file_for_approval:
            # Create the file in UploadedDocumentModel
            file_instance = UploadedDocumentModel.objects.create(
                uploaded_document_name=file_for_approval.name,  # Use the file's name
                uploaded_file=file_for_approval
            )
            validated_data['file_for_approval'] = file_instance

        # Create the request instance
        return super().create(validated_data)


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

     
    
    # def create(self, validated_data):
    #     request_type = validated_data.pop('request_type', None)
    #     if request_type:
    #         validated_data['request_type'] = WorkFlowProtocolModel.objects.get(protocol_name=request_type)
        
    #     approved_instance = super().create(validated_data)
    #     return approved_instance


   
