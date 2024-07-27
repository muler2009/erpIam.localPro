from rest_framework import status, generics, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication 
from iam.models import UserAccountsModel
from iam.users.serializers.get_user_account_serializer import GetUserAccountSerializer
from utils.custom_exception_handler import EmptyExceptionHandler

class UpdateUserAccountRequestHandler(generics.RetrieveUpdateAPIView):
    queryset = UserAccountsModel.objects.all()
    serializer_class = GetUserAccountSerializer
    lookup_field = 'user_account_id'
    authentication_classes = [JWTAuthentication]
    # permission_classes = [permissions.IsAuthenticated]
          
    def get_object(self):
        try:
            user_account_id = self.kwargs[self.lookup_field]
            return UserAccountsModel.objects.get(pk=user_account_id)
        except (UserAccountsModel.DoesNotExist, ValueError):
            raise EmptyExceptionHandler(message="Data not found", error_type="NOT_FOUND")

    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            if instance is None:
                raise EmptyExceptionHandler(message="Data not found", error_type="NOT_FOUND")
            update_serializer = GetUserAccountSerializer(instance, data=request.data)
            update_serializer.is_valid(raise_exception=True)

            password = update_serializer.validated_data.pop('password')  
            update_serializer.save()         
        
            # if password:
            #     instance.set_password(password)
            #     instance.save()
                     
        except EmptyExceptionHandler as exc:
            return Response({
                "message": exc.detail.get('message'),
                "error_type": exc.detail.get('error_type')
            }, status=exc.status_code)
        
        else:
            return Response({
                "status": status.HTTP_201_CREATED,
                "statusText": "Successfully Updated",
                # 'data': self.get_serializer(update_instance).data
            })