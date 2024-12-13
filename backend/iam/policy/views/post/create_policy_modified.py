from rest_framework import generics, mixins, status
from rest_framework.response import Response
from utils.custom_exception_handler import CustomExceptionForError
from ...models.policy_model import OromiaLandPolicy
from ...serializers.create.create_policy_modified_serializer import PolicySerializer

class CreatePolicyRequestHandler(generics.GenericAPIView, mixins.CreateModelMixin):
    queryset = OromiaLandPolicy.objects.all()
    serializer_class = PolicySerializer

    def post(self, request, *args, **kwargs):
        try:
            # Deserialize the request data
            data = request.data
            serializer = self.serializer_class(data=data)
            
            # Validate the serializer
            if not serializer.is_valid():
                # Raise a custom exception if validation fails
                raise CustomExceptionForError(message=serializer.errors, error_type="Data Missed", status_code=400)

            # Check for existing policy name
            policy_name = serializer.validated_data.get("policy_name")
            if OromiaLandPolicy.objects.filter(policy_name=policy_name).exists():
                raise CustomExceptionForError(
                    message=f"Policy with '{policy_name}' name already exists in the system. You can reuse it if the permission you want to provide is the same, otherwise, create a new custom policy with a different name.",
                    error_type="ALREADY_EXIST", 
                    status_code=409
                )

            # Save the new policy
            policy = serializer.save()  # Save validated data and create the policy

            # Return success response
            return Response({
                "status_code": 201,
                "status_text": "OK",
                "policy_id": policy.policy_ormomia_id,  # Optionally return the created policy ID
            }, status=status.HTTP_201_CREATED)

        except CustomExceptionForError as exc:
            # Handle custom exceptions
            return Response({
                "message": exc.message,
                "error_type": exc.error_type,
                "status_code": exc.status_code
            }, status=exc.status_code)