from rest_framework import serializers
from ..models.intermediate_request import IntermediateRequestModel
from ..models.approval_level import ApprovalStageModel
from ..serilizers.get_request_serializer import GetApprovedRequestModelSerializer


class ApprovalStageSerializer(serializers.ModelSerializer):
    request = serializers.SerializerMethodField()

    def get_request(self, obj):
        return obj.request.title
    
    class Meta:
        model = ApprovalStageModel
        fields = [
            'request', 
            'stage_name' 
            'stage_level,' 
            'role',
            'transition',
            
          
        ]

class GetIntermediateRequestModelSerializer(serializers.ModelSerializer):
    request = GetApprovedRequestModelSerializer(read_only=True)
    user = serializers.SerializerMethodField()
    role = serializers.SerializerMethodField()
    current_state = serializers.SerializerMethodField()
  

    def get_role(self, obj):
        return obj.role.role_name if obj.role and obj.role.role_name else None
    
    def get_user(self, obj):
        if obj.user:
            return f"{obj.user.first_name} {obj.user.last_name}"
        return None
        # return obj.user.username if obj.user and obj.user.username else None
    
   
    
    def get_current_state(self, obj):
        # Check if current_state exists before accessing its attributes
        return obj.current_state.state_name if obj.current_state else None
    
    class Meta:
        model = IntermediateRequestModel
        fields = [
            'user',
            'request',
            'stage_name',
            'role', 
            'action_taken',
            'comments',
            'request_recieved_at',
            'request_updated_at',
            'current_state',
            'stage'
        ]

        
      
        
        
