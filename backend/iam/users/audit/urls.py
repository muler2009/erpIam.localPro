from django.urls import path
from .views.get.get_login_ebvent_request_handler import LoginEventAuditLogRequestHandler
from .views.get.login_stastics_request_handler import LoginEventAuditLogStastics

urlpatterns = [
    path("audit_login_event/", LoginEventAuditLogRequestHandler.as_view()),
    path("audit_login_stastics/", LoginEventAuditLogRequestHandler.as_view(), name='audit_login_stastics')
]