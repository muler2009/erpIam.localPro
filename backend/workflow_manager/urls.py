from django.urls import path
from .views.get_state_request_handler import GetStateRequestHandler
from .views.get_constant_workflow_requestHandler import GetActionsRequestHandler, GetProtocolRequestHandler, GetTransitionRequestHandler
from .views.create_request_request_handler import RequestSubmissionHandler

urlpatterns = [
    path('get/', GetStateRequestHandler.as_view()),
    path('get_actions/', GetActionsRequestHandler.as_view()),
    path('get_protocol/', GetProtocolRequestHandler.as_view()),
    path('get_transitions/', GetTransitionRequestHandler.as_view()),
    path('send_request/', RequestSubmissionHandler.as_view())

]