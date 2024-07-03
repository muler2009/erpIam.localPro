from rest_framework import views, status
from rest_framework.request import Request
from rest_framework.response import Response
from django.core.exceptions import EmptyResultSet
from users.models import UserAccountsModel
from users.serializers.get_user_account_serializer import GetUserAccountSerializer

class GetUserRequestAccountHandler(views.APIView):
    def get(self, request: Request):
        try:
            users = UserAccountsModel.objects.all()
            if not users:
                raise EmptyResultSet
            user_serializered = GetUserAccountSerializer(users, many=True)
            return Response(user_serializered.data, status=status.HTTP_200_OK)
        except EmptyResultSet as exc:
            return Response({
                "status": status.HTTP_404_NOT_FOUND,
                "statusText": "No Data found"
            })
        except Exception as e: # If there is anykind of error occured
            return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)