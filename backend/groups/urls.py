from django.urls import path
from groups.views.create_group_request_handler import CreateGroupRequestHandler
from groups.views.get_group_request_handler import GetGroupsRequestHandler

urlpatterns = [
    path('create/', CreateGroupRequestHandler.as_view()),
    path('get/', GetGroupsRequestHandler.as_view()),

]