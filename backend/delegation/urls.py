from django.urls import path
from .views.get.get_delegations import GetActiveDelegationsRequestHandler, GetExpiredDelegationsRequestHandler
from .views.post.create_delegation_req_handler import CreateDelegationRequestHandler


app_name ='delegation'

urlpatterns = [
    path('get_delegation/', GetActiveDelegationsRequestHandler.as_view() , name='delegating'),
    path('new_delegation/', CreateDelegationRequestHandler.as_view() , name='new_delegation'),
    path('expired/', GetExpiredDelegationsRequestHandler.as_view() , name='expired_delegations'),

]