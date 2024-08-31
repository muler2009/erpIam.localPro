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
    class Meta:
        model = IntermediateRequestModel
        fields = '__all__'
