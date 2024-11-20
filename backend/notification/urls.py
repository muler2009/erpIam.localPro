from django.urls import path
from notification.views.get.show_notification_paginated_handler import ShowNotificationRequestHandler_
from notification.views.get.show_notification import ShowNotificationRequestHandler
from notification.views.get.get_notification_template_request_handler import GetNotificationTemplateRequestHndler
from notification.views.get.get_user_preference_request_handler import GetNotificationPreferenceRequestHandler
from notification.views.get.get_delegation_only_req_handler import GetDelegationNotificationRequestHandler


from notification.views.post.create_notification_request_handler import CreateNotificationRequestHandler
from notification.views.post.create_template_request_handler import CreateNotificationTemplateRequestHandler
from notification.views.post.set_up_notification_preference_request_handler import SetUpPreferenceRequestHandler
from notification.views.change.mark_notification_read_handler import MarkNotificationAsReadRequestHandler



urlpatterns = [
    path('create/', CreateNotificationRequestHandler.as_view(), name='create-notification'),
    path('show_paginated/', ShowNotificationRequestHandler_.as_view(), name='show-notification'),
    path('show/', ShowNotificationRequestHandler.as_view(), name='show-notification'),
    path('delegationOnly/', GetDelegationNotificationRequestHandler.as_view(), name='get-notification'),


    # Notification tempate creator
    path('new_template/', CreateNotificationTemplateRequestHandler.as_view(), name='new-notification-template'),
    path('template/', GetNotificationTemplateRequestHndler.as_view(), name='notification-template'),

    # Notification preference URL 
    path('setup_preference/', SetUpPreferenceRequestHandler.as_view(), name='setup-preference'),
    path('preference/', GetNotificationPreferenceRequestHandler.as_view(), name='user-preference'),
    path('update/<str:notification_id>/mark-as-read/', MarkNotificationAsReadRequestHandler.as_view(), name='mark-notification-as-read'),

]