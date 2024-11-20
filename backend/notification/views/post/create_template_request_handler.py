from rest_framework import status, generics, mixins
from rest_framework.request import Request
from rest_framework.response import Response
from utils.custom_exception_handler import CustomExceptionForError
from ...models.notification_event_type import NotificationEventTypeModel
from ...serializer.create_seriallizer.create_notification_template_serializer import CreateNotificationTemplateSerializer


class CreateNotificationTemplateRequestHandler(generics.GenericAPIView, mixins.CreateModelMixin):
    serializer_class = CreateNotificationTemplateSerializer

    def post(self, request: Request, *args, **kwargs):
        try:
            template_data = request.data
            serializer = self.serializer_class(data=template_data)

            if not serializer.is_valid():
                 raise CustomExceptionForError(message=serializer.errors, error_type="ERROR", status_code=400)
            
            self.check_for_duplicate_template(serializer)

            serializer.save()

        except CustomExceptionForError as exc:
            return Response({
                'message': exc.message,
                'error_type': exc.error_type
            }, status=status.HTTP_400_BAD_REQUEST)
        
        else:
            return Response({
                "status_code": 201,
                "status_text": "Template Created Successfully"
            }, status=status.HTTP_201_CREATED)

    def check_for_duplicate_template(self, serializer):
        eventType_name = serializer.validated_data.get("eventType_name")
        if NotificationEventTypeModel.objects.filter(eventType_name=eventType_name).exists():
            raise CustomExceptionForError(
                    message=f"Template with '{eventType_name}' name already exists in the system.",
                    error_type="ALREADY_EXIST", 
                    status_code=409
                )
        return eventType_name


