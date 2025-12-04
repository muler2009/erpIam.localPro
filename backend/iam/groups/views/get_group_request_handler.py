from rest_framework import status, generics, mixins
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import NotFound, AuthenticationFailed
from utils.exceptions.exception_classes import CustomExceptionForError
from iam.groups.models import PosixGroupUserModel
from iam.groups.serializers.get_group_serializer import GetGroupSerializer
from iam.access_policy.authorization_policy import IsAuthenticatedAdminUser       

class GetGroupsRequestHandler(generics.GenericAPIView, mixins.ListModelMixin):
    authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticatedAdminUser] # Ensure the user is authenticated
    serializer_class = GetGroupSerializer
    
    def get(self, request):
        user = request.user
        try:
            groups = PosixGroupUserModel.objects.all()
            if not groups.exists():  # Use exists() to avoid querying all objects
                raise CustomExceptionForError(message="No Group Created!", error_type="NOT_FOUND")
            
            groups_serializer = self.serializer_class(groups, many=True)
        except CustomExceptionForError as exc:
            return Response({
                "message": exc.message,
                "error_type": exc.error_type
            }, status=status.HTTP_404_NOT_FOUND)
        
        else:
            return Response(groups_serializer.data, status=status.HTTP_200_OK)

