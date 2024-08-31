from rest_framework import serializers
from ..models.intermediate_request import IntermediateRequestModel
from ..models.approval_level import ApprovalStageModel


class ApprovalStageSerializer(serializers.ModelSerializer):
    request = serializers.SerializerMethodField()

    def get_request(self, obj):
        return obj.request.title
    
    class Meta:
        model = ApprovalStageModel
        fields = [
            'request', 'stage_name' 
            'stage_level,' 
            'role',
            'transition',
          
        ]

class GetIntermediateRequestModelSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    role = serializers.SerializerMethodField()
    current_state = serializers.SerializerMethodField()

    def get_role(self, object):
        return object.role.role_name if object.role.role_name else None
    
    def get_user(self, object):
        return object.user.username if object.user.username else None
    
    def get_current_state(self, object):
        return object.current_state.state_name
    
    
    
    class Meta:
        model = IntermediateRequestModel
        fields = [
            'user',
            'stage_name',
            'role', 
            'action_taken',
            'comments',
            'request_recieved_at',
            'request_updated_at',
            'current_state',
        ]

        
      
        
        
