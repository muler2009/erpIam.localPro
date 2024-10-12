from rest_framework import generics, status
from rest_framework.response import Response
from iam.role.models import IamRoleModel
from iam.role.serializers.get_role_serializers import GetIamRoleModelSerializer
from utils.custom_exception_handler import CustomExceptionForError



class GetIamRoleInstanceRequestHandler(generics.GenericAPIView):
    serializer_class =GetIamRoleModelSerializer

    def get_queryset(self):
        return IamRoleModel.objects.all()

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        try:
            # check if the data available
            if not queryset:
                raise CustomExceptionForError(message="Empty Model", error_type="NOT_FOUND")
            role_serializer = self.get_serializer(queryset, many=True)

        # except DoesNotExist as exception:
        #     return Response({
        #         "ERROR_MESSAGE": f"{exception.message}",
        #         "ERROR_TYPE": f"{exception.error_type}"
        #     }, status=status.HTTP_404_NOT_FOUND)

        except CustomExceptionForError as exception:
            return Response({
                "ERROR_MESSAGE": f"{exception.message}",
                "ERROR_TYPE": f"{exception.error_type}"
            }, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(role_serializer.data, status=status.HTTP_200_OK)

