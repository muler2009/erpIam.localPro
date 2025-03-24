from rest_framework import views, status, permissions, generics, mixins
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, AuthenticationFailed
from iam.groups.models import PosixGroupUserModel
from iam.groups.serializers.get_group_serializer import GetGroupSerializer
from iam.groups.access_policies.get_group_policy import GetGroupAccessPolicy
       

class GetGroupsRequestHandler(generics.GenericAPIView, mixins.ListModelMixin):
    permission_classes = [GetGroupAccessPolicy] # Ensure the user is authenticated
    

    def get(self, request):
        user = request.user
         # Debugging user info
        if not user.is_authenticated:
            print("User is not authenticated")
            # return Response({"Error": "User is not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)
        if not user.is_active:
            print("User is inactive")
            # return Response({"Error": "User is inactive"}, status=status.HTTP_403_FORBIDDEN)


        try:
            groups = PosixGroupUserModel.objects.all()
            if not groups.exists():  # Use exists() to avoid querying all objects
                raise NotFound(detail="No Group Found")
            
            groups_serializer = GetGroupSerializer(groups, many=True)
            return Response(groups_serializer.data, status=status.HTTP_200_OK)
        except NotFound as exc:
            return Response({
                "Error": exc.detail
            }, status=status.HTTP_404_NOT_FOUND)