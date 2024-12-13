from rest_framework import generics, mixins, status
from rest_framework.response import Response
from utils.custom_exception_handler import CustomExceptionForError
from ...models.policy_model import OromiaLandPolicy
from ...serializers.get.get_policy_action_serialzier import PolicyActionSerializer
from ...serializers.get.get_policy_serializer import PolicySerializer


class GetAllPolicyActionRequestHandler(generics.GenericAPIView, mixins.ListModelMixin):
    queryset = OromiaLandPolicy.objects.all()
    serializer_class = PolicySerializer

    def get(self, request, *args, **kwarsg):
        try: 
            data = self.get_queryset()
            if not data:
                raise CustomExceptionForError(message="No Action Found", error_type="NOT_FOUND", status_code=404)
            policy_serializer = self.serializer_class(data, many=True)
        except CustomExceptionForError as exc:
            return Response({
                "message": exc.message,
                "error_type": exc.error_type,
                "status_code": exc.status_code
            })

        else: 
            return Response(policy_serializer.data, status=status.HTTP_200_OK)

     
            


  