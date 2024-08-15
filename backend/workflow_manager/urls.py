from django.urls import path
from .views.get_state_request_handler import GetStateRequestHandler, GetRequesthandler
from .views.get_constant_workflow_requestHandler import GetActionsRequestHandler, GetProtocolRequestHandler, GetTransitionRequestHandler
from .views.send_request_handler import RequestSubmissionHandler
from .views.perform_transition_request_handler import PerformTransitionRequestHandler

urlpatterns = [
    path('get/', GetStateRequestHandler.as_view()),
    path('get_actions/', GetActionsRequestHandler.as_view()),
    path('get_request/', GetRequesthandler.as_view()),

    path('get_protocol/', GetProtocolRequestHandler.as_view()),
    path('get_transitions/', GetTransitionRequestHandler.as_view()),
    path('send_request/', RequestSubmissionHandler.as_view()),
    path('send_request/<str:request_id>/transition/', PerformTransitionRequestHandler.as_view()),

]