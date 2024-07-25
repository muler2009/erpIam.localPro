from django.urls import path
from iam.groups.views.create_group_request_handler import CreateGroupRequestHandler
from iam.groups.views.get_group_request_handler import GetGroupsRequestHandler

urlpatterns = [
    path('create_group/', CreateGroupRequestHandler.as_view()),
    path('get_group/', GetGroupsRequestHandler.as_view()),

]