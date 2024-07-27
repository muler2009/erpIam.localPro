from rest_framework import generics, status
from rest_framework.request import Request
from rest_framework.response import Response
from iam.role.models import IamRoleModel
from iam.role.serializers.create_role_serializers import CreateIamRoleModelSerializer
from utils.custom_exception_handler import AlreadyExistAPIException


class CreateRoleModelInstanceRequestHandler(generics.GenericAPIView):
    queryset = IamRoleModel.objects.all()
    serializer_class = CreateIamRoleModelSerializer

    def post(self, request: Request, **kwargs):
        data = request.data
        try: 
            # Check if the instance already exists
            if IamRoleModel.objects.filter(role_name=request.data.get('role_name')).exists():
                raise AlreadyExistAPIException(message="Role Already Exist", error_type="ALREADY_EXIST")
            
             # If not, proceed with the standard creation process
            role_serializer = self.get_serializer(data=data)
            if role_serializer.is_valid(raise_exception=True):
                role_serializer.create(role_serializer.validated_data)
                

        except AlreadyExistAPIException as exception:
            return Response({
                "ERROR_MESSAGE": f"{exception.message}",
                "ERROR_TYPE": f"{exception.error_type}",
                "ERROR_CODE": f"{exception.default_code}"

            }, status=status.HTTP_409_CONFLICT)

        else:
            return Response({
                'status_code': 201,
                'status_text': 'Role Instance Successfully Created'
            }, status=status.HTTP_201_CREATED)