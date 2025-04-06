from rest_framework import status, generics, mixins
from rest_framework.response import Response
from utils.exceptions.exception_classes import CustomExceptionForError


class BaseAccessLogsHandler(generics.GenericAPIView, mixins.ListModelMixin):
   
    def get_queryset(self):
        """
        Ensures the queryset is fresh by using `.all()`
        Child classes can override this if necessary.
        """
        if self.queryset is not None:
            return self.queryset.all()  # Ensures new evaluation each request
        return super().get_queryset()

    def get(self, request, *args, **kwargs):
        try:
            data = self.get_queryset()
            if not data.exists():  # Using .exists() to optimize query
                raise CustomExceptionForError(message="Not Found", error_type="NOT_FOUND_ERROR")
            
            serialized_data = self.serializer_class(data, many=True)

        except CustomExceptionForError as exc:
            return Response({
                "message": exc.message,
                "error_type": exc.error_type
            }, status=status.HTTP_204_NO_CONTENT)

        else:
            return Response(serialized_data.data, status=status.HTTP_200_OK)