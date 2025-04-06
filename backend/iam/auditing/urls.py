from django.urls import path
from .views.get_successful_login import AccessSuccessfulLogsRequestHandler, AccessFailureLogsRequestHandler

app_name = "auditing"
urlpatterns = [
    path("successful-logs/", AccessSuccessfulLogsRequestHandler.as_view(), name="successful-login"),
    path("failed-logs/", AccessFailureLogsRequestHandler.as_view(), name="failed-login")

]