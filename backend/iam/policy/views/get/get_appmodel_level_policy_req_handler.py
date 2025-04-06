from rest_framework import generics, status, mixins
from rest_framework.response import Response
from utils.custom_exception_handler import CustomExceptionForError
from ...models.policy_model import OromiaLandPolicy
from ...serializers.get.get_oromia_land_policy_serializer import GetOLBPolicySerailzier
from iam.access_policy.authorization_policy import IsAuthenticatedAdminUser


class GetModelLevelPolicyRequestHandler(generics.GenericAPIView, mixins.ListModelMixin):
    queryset = OromiaLandPolicy.objects.all()
    serializer_class = GetOLBPolicySerailzier
    permission_classes = [IsAuthenticatedAdminUser]


    def get_queryset(self):
        data = super().get_queryset()
        return data.filter(is_model_level=True)

    def get(self, request, *args, **kwargs):
        try:
            data = self.get_queryset()
            if not data:
                raise CustomExceptionForError(message="No Model Policies Available Yet", error_type="NOT_FOUND", status_code=404)
            model_level_serialzier = self.serializer_class(data, many=True)
            
            return Response(model_level_serialzier.data, status=status.HTTP_200_OK)

        except CustomExceptionForError as exc:
            return Response({
                'message': exc.message,
                'error_type': exc.error_type,
                'status_code': exc.status_code
            }, status=status.HTTP_404_NOT_FOUND)
        

# GET request handler for only application level policies
class GetApplicationLevelPolicyRequestHandler(generics.GenericAPIView, mixins.ListModelMixin):
    queryset = OromiaLandPolicy.objects.all()
    serializer_class = GetOLBPolicySerailzier

    def get_queryset(self):
        app_level_policy = super().get_queryset()
        return app_level_policy.filter(is_app_level=True)
    
    def get(self, request, *args, **kwargs):
        try: 
            if not self.get_queryset():
                raise CustomExceptionForError(message="No Application Availabel yet", error_type="NOT_FOUND", status_code=404)
            app_level_serializer = self.serializer_class(self.get_queryset(), many=True)
        
        except CustomExceptionForError as exc:
            return Response({
                'message': exc.message,
                'error_type': exc.error_type,
                'status_code': exc.status_code
            }, status=status.HTTP_404_NOT_FOUND)
        
        else:
            return Response(app_level_serializer.data, status=status.HTTP_200_OK )
        

