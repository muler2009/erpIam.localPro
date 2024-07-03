from rest_framework import views, status
from rest_framework.request import Request
from rest_framework.response import Response
from utils.custom_exception_handler import CustomExceptionHandler, AlreadyExists
from groups.models import PosixGroupUserModel
from groups.serializers.create_group_serializer import CreateGroupSerializer


class CreateGroupRequestHandler(views.APIView):        
    def post(self, request: Request):              
        try:   
            create_group_serializer = CreateGroupSerializer(data=request.data)
            create_group_serializer.is_valid(raise_exception=True)  

            if PosixGroupUserModel.objects.filter(group_name=request.data.get('group_name')).exists():
                raise AlreadyExists           
            create_group_serializer.create(create_group_serializer.validated_data)  

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
    