from django.urls import path
from notification.views.create_notification_handler.create_notification_request_handler import CreateNotificationRequestHandler
from notification.views.get_notification_handler.show_notification_handler import ShowNotificationRequestHandler
from notification.views.change_notification_handler.mark_notification_read_handler import MarkNotificationAsReadRequestHandler

urlpatterns = [
    path('create/', CreateNotificationRequestHandler.as_view(), name='create-notification'),
    path('show/', ShowNotificationRequestHandler.as_view(), name='show-notification'),
    path('update/<str:notification_id>/mark-as-read/', MarkNotificationAsReadRequestHandler.as_view(), name='mark-notification-as-read'),
]