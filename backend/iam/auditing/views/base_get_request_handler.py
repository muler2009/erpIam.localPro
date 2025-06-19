from rest_framework import status, generics, mixins
from rest_framework.response import Response
from utils.exceptions.exception_classes import CustomExceptionForError


class BaseAccessLogsHandler(generics.GenericAPIView, mixins.ListModelMixin):
    def get_queryset(self):
        if self.queryset is not None:
            return self.queryset.all()
        return super().get_queryset()

    def get_empty_response(self):
        return Response({
            "message": "Not Found",
            "error_type": "NOT_FOUND",
            "status_code": 204,
            "detail": "nothing associated found"
        }, status=status.HTTP_200_OK)  # or 204, depending on preference

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        if not queryset.exists():
            return self.get_empty_response()

        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)