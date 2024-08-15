from django.urls import path
from notification.views.create_notification_request_handler import CreateNotificationRequestHandler
from notification.views.show_notification_handler import ShowNotificationRequestHandler

urlpatterns = [
    path('create/', CreateNotificationRequestHandler.as_view()),
    path('show/', ShowNotificationRequestHandler.as_view()),


]