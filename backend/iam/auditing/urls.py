from django.urls import path
from .views.get_successful_login import AccessSuccessfulLogsRequestHandler, AccessFailureLogsRequestHandler, CategorizedAccessLogView
from .views.get_locked_account_request_handler import LockedAccountsRequestHandler
from .views.unlock_locked_acc_request_handler import UnlockLockedRequestHandler

app_name = "auditing"
urlpatterns = [
    path("successful-logs/", AccessSuccessfulLogsRequestHandler.as_view(), name="successful-login"),
    path("failed-logs/", AccessFailureLogsRequestHandler.as_view(), name="failed-login"),
    path("category-logs/", CategorizedAccessLogView.as_view(), name="failed-login"),
    path("locked-accounts/", LockedAccountsRequestHandler.as_view(), name="locked-account"),
    path("unlocked-account/", UnlockLockedRequestHandler.as_view(), name="unlock-account"),

    



]