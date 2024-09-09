from rest_framework import serializers
import os
from workflow_manager.models.request_model import RequestInWorkFlowModel, ApprovedRequestByRequestOwnerModel, UnApprovedRequestByOwnerModel, ApprovedRequestsModel
from workflow_manager.models.workflow_protocol_model import WorkFlowProtocolModel
from dmsmodule.helper.file_extension_validator import FileExtensionValidator
from dmsmodule.file_mangement.models.document_uploads_models import DocumentVersion

   
class GetRequestInWorkFlowModelSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()
    file_for_approval = serializers.FileField(write_only=True, required=False, validators=[FileExtensionValidator()])
    file_name = serializers.SerializerMethodField()
    
    class Meta:
        abstract = True
        fields = ['request_id', 'title', 'request_sent_at', 'file_for_approval', 'file_url', 'file_name', 'file_for_approval']
        extra_kwargs = {
            'request_id': {'read_only': True}
        }
    
    def get_file_url(self, obj):
        request = self.context.get('request')
        if request and obj.file_for_approval and hasattr(obj.file_for_approval.uploaded_file, 'url'):
            return request.build_absolute_uri(obj.file_for_approval.uploaded_file.url)
        return None

    def get_file_name(self, obj):
        if obj.file_for_approval:
            return obj.file_for_approval.document_name
        return None



class GetUnapprovedRequestModelSerializer(GetRequestInWorkFlowModelSerializer):
    approval_status = serializers.SerializerMethodField()
    requesting_user = serializers.SerializerMethodField()
    request_assigned_to_user = serializers.SerializerMethodField()
    request_type = serializers.SerializerMethodField()

    class Meta(GetRequestInWorkFlowModelSerializer.Meta):
        model = UnApprovedRequestByOwnerModel
        fields = GetRequestInWorkFlowModelSerializer.Meta.fields + ['approval_status', 'requesting_user', 'request_assigned_to_user', 'request_type']
    
    def get_requesting_user(self, object):
        return object.requesting_user.username
    
    def get_request_assigned_to_user(self, obj):
        return obj.request_assigned_to_user.username if obj.request_assigned_to_user else None

    def get_request_type(self, obj):
        return obj.request_type.protocol_name if obj.request_type else None
    
    def get_approval_status(self, object):
        if object.approval_status:
            return object.approval_status.state_name
        return None  # or some default value

    def to_internal_value(self, data):
        # Override this method to convert name to ID
        if 'request_type' in data:
            try:
                data['request_type'] = WorkFlowProtocolModel.objects.get(protocol_name=data['request_type']).pk
            except WorkFlowProtocolModel.DoesNotExist:
                raise serializers.ValidationError({"request_type_name": "Invalid request type name"})
        return super().to_internal_value(data)


class GetApprovedRequestModelSerializer(GetRequestInWorkFlowModelSerializer):
    current_state = serializers.SerializerMethodField()
    requesting_user = serializers.SerializerMethodField()
    request_assigned_to_user = serializers.SerializerMethodField()
    request_type = serializers.SerializerMethodField()

    class Meta(GetRequestInWorkFlowModelSerializer.Meta):
        model = ApprovedRequestByRequestOwnerModel
        fields = GetRequestInWorkFlowModelSerializer.Meta.fields + ['current_state', 'requesting_user', 'request_assigned_to_user', 'request_type']


    def get_current_state(self, object):
        return object.current_state.state_name
    
    def get_requesting_user(self, object):
        return object.requesting_user.username
    
    def get_request_assigned_to_user(self, obj):
        return obj.request_assigned_to_user.username if obj.request_assigned_to_user else None
    
    def get_request_type(self, obj):
        return obj.request_type.protocol_name if obj.request_type else None
    
    def to_internal_value(self, data):
        # Override this method to convert name to ID
        if 'request_type' in data:
            try:
                data['request_type'] = WorkFlowProtocolModel.objects.get(protocol_name=data['request_type']).pk
            except WorkFlowProtocolModel.DoesNotExist:
                raise serializers.ValidationError({"request_type_name": "Invalid request type name"})
        return super().to_internal_value(data)

    

class RequestSubmissionModelSerializer(serializers.ModelSerializer):
    request_assigned_to_user = serializers.SerializerMethodField()
    class Meta:
        model = ApprovedRequestByRequestOwnerModel
        fields = ['request_id', 'title', 'requesting_user', 'request_assigned_to_user', 'current_state', 'request_type', 'request_sent_at']
        extra_kwargs = {
            'request_id': {'read_only': True}
        }

        

class GetFinalApprovedRequestModelSerializer(GetRequestInWorkFlowModelSerializer):
    current_state = serializers.SerializerMethodField()
    requesting_user = serializers.SerializerMethodField()
    request_assigned_to_user = serializers.SerializerMethodField()
    request_type = serializers.SerializerMethodField()

    def get_current_state(self, object):
        return object.current_state.state_name
    
    def get_requesting_user(self, object):
        return object.requesting_user.username
    
    def get_request_assigned_to_user(self, obj):
        return obj.request_assigned_to_user.username if obj.request_assigned_to_user else None
    
    def get_request_type(self, obj):
        return obj.request_type.protocol_name if obj.request_type else None
    
    
    def to_internal_value(self, data):
        # Override this method to convert name to ID
        if 'request_type' in data:
            try:
                data['request_type'] = WorkFlowProtocolModel.objects.get(protocol_name=data['request_type']).pk
            except WorkFlowProtocolModel.DoesNotExist:
                raise serializers.ValidationError({"request_type_name": "Invalid request type name"})
        return super().to_internal_value(data)

    class Meta:
        model = ApprovedRequestsModel
        fields = GetRequestInWorkFlowModelSerializer.Meta.fields + ['current_state', 'requesting_user', 'request_assigned_to_user', 'request_type']
