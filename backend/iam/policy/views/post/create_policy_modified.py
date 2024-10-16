from rest_framework import generics, mixins, status
from rest_framework.response import Response
from utils.custom_exception_handler import CustomExceptionForError
from ...models.policy_mocel_modified import OromiaLandPolicy
from ...serializers.create.create_policy_modified_serializer import PolicySerializer

class PolicyCreateView(generics.GenericAPIView, mixins.CreateModelMixin):
    queryset = OromiaLandPolicy.objects.all()
    serializer_class = PolicySerializer

    def post(self, request, *args, **kwargs):
        try: 
            data = request.data
            serializer = self.serializer_class(data=data)
            if not serializer.is_valid(raise_exception=True):
                raise CustomExceptionForError(message="Error")
            
            policy_name = serializer.validated_data.get("policy_name")
            if OromiaLandPolicy.objects.filter(policy_name=policy_name).exists():
                raise CustomExceptionForError(message="Policy action already available")
            
            # Save the new policy
            serializer.save()  # Save the validated data to create the policy
            
            # Return the serialized data for the created policy
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            

        except CustomExceptionForError as exc:
            return Response({
                "message": exc.message,
                "error_type": exc.error_type
            })
            
