from rest_framework import serializers, status, views, generics, mixins
from rest_framework.response import Response
from iam.users.serializers.create_user_account_serializer import CreateLDAPUserSerializer
from utils.custom_exception_handler import CustomSerializerValidationError
from django.contrib.auth.hashers import make_password
from iam.models import UserAccountsModel

# class CreateUserAccountRequestHandler(views.APIView):
#     def post(self, request):
#         password = request.data.get('password')
#         print(f"Password from request: {password}")
        
#         user_serializer = CreateLDAPUserSerializer(data=request.data) 
#         try:        
#             # password = user_serializer.validated_data.pop('password')
#             # password = user_serializer.validated_data.get('password')
#             # user_serializer.validated_data.pop('password')
#             user_serializer.is_valid(raise_exception=True)  
#             group = user_serializer.validated_data.pop('group')
#             user_serializer.validated_data['group']= group
#             user = user_serializer.save()
#             user.set_password(password)
#             user.save(update_fields=['password'])
#             # user_serializer.create(user_serializer.validated_data)  
#             # if password:
#             #     user.set_password(password)
#             #     user.save()
                                                        
#         except CustomSerializerValidationError as error:
#             errors_container = {}
#             for message_key, message in error.detail.items():
#                 errors_container[message_key] = str(message[0])
#             return Response({'error': errors_container}, status=status.HTTP_400_BAD_REQUEST)
               
#         except ConnectionError as e:
#             return Response({f"{type(e).__name__}": str(e)})
    
#         else:                               
#             return Response({
#                 'status_code': status.HTTP_201_CREATED,
#                 'statusText': "User Created Successfully",
#             }, status=status.HTTP_201_CREATED)  

class CreateUserAccountRequestHandler(generics.GenericAPIView, mixins.CreateModelMixin):
    queryset = UserAccountsModel.objects.all()
    serializer_class = CreateLDAPUserSerializer


    def post(self, request): 
        user_serializer = self.serializer_class(data=request.data)
        try:
            user_serializer.is_valid(raise_exception=True)
            user = user_serializer.save()
            password = request.data.get('password')
            # hashed_password = make_password(password)
            user.set_password(password)
            
            print(f"Set plain password: {user._plain_password}")
            # Check and ensure the plain password is set correctly
            if not user._plain_password:
                print("Plain password is not set correctly in the user instance.")
            user.save(update_fields=['password'])  # Ensure the password is saved

        except CustomSerializerValidationError as error:
            errors_container = {}
            for message_key, message in error.detail.items():
                errors_container[message_key] = str(message[0])
            return Response({'error': errors_container}, status=status.HTTP_400_BAD_REQUEST)

        except ConnectionError as e:
            return Response({f"{type(e).__name__}": str(e)})

        else:
            return Response({
                'status_code': status.HTTP_201_CREATED,
                'statusText': "User Created Successfully",
            }, status=status.HTTP_201_CREATED)