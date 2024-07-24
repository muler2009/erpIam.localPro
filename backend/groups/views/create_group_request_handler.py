from rest_framework import views, status
from rest_framework.request import Request
from rest_framework.response import Response
from utils.custom_exception_handler import CustomExceptionHandler, AlreadyExists
from groups.models import PosixGroupUserModel
from users.models import UserAccountsModel
from groups.serializers.create_group_serializer import CreateGroupSerializer


class CreateGroupRequestHandler(views.APIView):        
    def post(self, request: Request):              
        try:   
            create_group_serializer = CreateGroupSerializer(data=request.data)
            create_group_serializer.is_valid(raise_exception=True)  

            if PosixGroupUserModel.objects.filter(group_name=request.data.get('group_name')).exists():
                raise AlreadyExists    
            # group_members = create_group_serializer.validated_data.pop("members")
            # for username in group_members:
            #     group_members.use
                   
            # create_group_serializer.create(create_group_serializer.validated_data)  
            # Create the group instance
            group_instance = create_group_serializer.create(create_group_serializer.validated_data)

            # Ensure members are added before saving
            members_data = request.data.get('members', [])
            for username in members_data:
                user = UserAccountsModel.objects.get(username=username)
                group_instance.members.add(user)
                
            
            group_instance.save()

        except CustomExceptionHandler as exc:
            return Response({
                "ERROR_TYPE": f"{request.data['group_posix_Id']} {exc.error_type}",
                "ERROR_MESSAGE": exc.message,
                "STATUS_CODE": exc.status_code
            })                
        except AlreadyExists as exc:
            return Response({
                f'group {request.data.get("group_name")}': str(exc.default_code),
                'status_code': exc.status_code,
                'Error': exc.detail, 
            })
        else:   
            response_data = {
                        'status': status.HTTP_201_CREATED,
                        'statusText': "Group Created Successfully",
                        # 'data': GetGroupSerializer(group_instance).data
                    }           
            return Response(response_data)
    