from rest_framework import status, generics, mixins
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from utils.custom_exception_handler import CustomExceptionForError
from iam.groups.models import PosixGroupUserModel
from iam.models import UserAccountsModel
from iam.groups.serializers.create_group_serializer import CreateGroupSerializer
from iam.access_policy.authorization_policy import IsAuthenticatedAdminUser

class CreateGroupRequestHandler(generics.GenericAPIView, mixins.CreateModelMixin):  
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticatedAdminUser]
    serializer_class = CreateGroupSerializer

    def post(self, request: Request):              
        try:   
            create_group_serializer = self.serializer_class(data=request.data)
            create_group_serializer.is_valid(raise_exception=True)  

            if PosixGroupUserModel.objects.filter(group_name=request.data.get('group_name')).exists():
                raise CustomExceptionForError(message="Group already exist", error_type="ALREADY EXIST", status_code=400)    
            
            group_instance = create_group_serializer.create(create_group_serializer.validated_data)

            # Ensure members are added before saving
            members_data = request.data.get('members', [])
            for username in members_data:
                user = UserAccountsModel.objects.get(username=username)
                group_instance.members.add(user)
                    
            group_instance.save()

        except CustomExceptionForError as exc:
            return Response({
                "error_type": f"{request.data['group_posix_Id']} {exc.error_type}",
                "message": exc.message,
                "status_code": exc.status_code
            })                

        else:   
            response_data = {
                        'status': status.HTTP_201_CREATED,
                        'statusText': "Group Created Successfully",
                        # 'data': GetGroupSerializer(group_instance).data
                    }           
            return Response(response_data)
    