from rest_framework import views, status, generics, mixins
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.core.exceptions import EmptyResultSet
from iam.models import UserAccountsModel
from iam.users.serializers.get_user_account_serializer import GetUserAccountSerializer
from iam.access_policy.authorization_policy import IsAuthenticatedAdminUser

class GetUserRequestAccountHandler(generics.GenericAPIView, mixins.ListModelMixin):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticatedAdminUser]
    serializer_class = GetUserAccountSerializer

    def get(self, request: Request):
        try:
            users = UserAccountsModel.objects.all()
            if not users:
                raise EmptyResultSet
            user_serializered = self.serializer_class(users, many=True)
            return Response(user_serializered.data, status=status.HTTP_200_OK)
        except EmptyResultSet as exc:
            return Response({
                "status": status.HTTP_404_NOT_FOUND,
                "statusText": "No Data found"
            })
        except Exception as e: # If there is anykind of error occured
            return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)