from rest_framework import generics, status
from rest_framework.request import Request
from rest_framework.response import Response
from iam.role.models import IamRoleModel
from iam.role.serializers.create_role_serializers import CreateIamRoleModelSerializer
from utils.custom_exception_handler import AlreadyExistAPIException
from iam.models import UserAccountsModel
from utils.custom_exception_handler import CustomExceptionForError

class CreateRoleModelInstanceRequestHandler(generics.GenericAPIView):
    queryset = IamRoleModel.objects.all()
    serializer_class = CreateIamRoleModelSerializer

    def post(self, request: Request, **kwargs):
        try:
            # Check for duplicates
            self.check_for_duplicates(request)
            
            # Validate the request data
            serializer = self.validate_request_data(request)
            
            # Save the role instance and associate users
            role_instance = self.save_role_instance(serializer)

            # Create role-user associations
            self.create_role_instance(role_instance, request)

        except AlreadyExistAPIException as exception:
            return Response({
                "message": f"{exception.message}",
                "error_type": f"{exception.error_type}",
                "status_code": f"{exception.default_code}"
            }, status=status.HTTP_409_CONFLICT)
        except CustomExceptionForError as exception:
            return Response({
                "message": f"{exception.message}",
                "error_type": f"{exception.error_type}",
                "status_code": f"{exception.default_code}"
            }, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({
                'status_code': 201,
                'status_text': 'Role Instance Successfully Created'
            }, status=status.HTTP_201_CREATED)
        
    
    def check_for_duplicates(self, request):
        role_exists = IamRoleModel.objects.filter(role_name=request.data.get('role_name')).exists()
        if role_exists:
            raise AlreadyExistAPIException(message="Role Already Exists", error_type="ALREADY_EXIST")
    
    def validate_request_data(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        if not serializer.is_valid(raise_exception=False):  # Allow serializer to raise exceptions
            raise CustomExceptionForError(message="Invalid data", error_type="ERROR")
        return serializer
    
    def create_role_instance(self, role_instance, request):
        user_role = request.data.get('users', [])
        for username in user_role:
            try:
                user = UserAccountsModel.objects.get(username=username)
                role_instance.users.add(user)
            except UserAccountsModel.DoesNotExist:
                raise CustomExceptionForError(message=f"User {username} does not exist", error_type="USER_NOT_FOUND")
        role_instance.save()  # Save the role instance with associated users
    
    def save_role_instance(self, serializer):
        return serializer.save()

    

