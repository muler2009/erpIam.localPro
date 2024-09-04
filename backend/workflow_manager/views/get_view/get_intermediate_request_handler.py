from rest_framework import generics, permissions, status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from utils.custom_exception_handler import EmptyExceptionHandler
from ...models.intermediate_request import IntermediateRequestModel
from ...serilizers.get_intermediate_request_serializer import GetIntermediateRequestModelSerializer

class GetIntermediateRequestHandler(generics.GenericAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    queryset = IntermediateRequestModel.objects.all()
    serializer_class = GetIntermediateRequestModelSerializer

    def get(self, request: Request, *args, **kwargs):
        data = self.get_queryset()
        try:
            if not data:
                raise EmptyExceptionHandler(message="No Request in this Intermediate", error_type="NO REQUEST")
            serializer = self.serializer_class(data, many=True, context={'request': request})
        except EmptyExceptionHandler as exc:
            return Response({
                "status_text": exc.message,
                "error": exc.error_type
            }, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({
                "status": data.count(),
                "data": serializer.data
            }, status=status.HTTP_200_OK)