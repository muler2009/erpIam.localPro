from django.urls import path
from .views.get.get_delegetion_req_handler import GetDelegationsRequestHandler
from .views.post.create_delegation_req_handler import CreateDelegationRequestHandler


app_name ='delegation'

urlpatterns = [
    path('get_delegation/', GetDelegationsRequestHandler.as_view() , name='delegating'),
    path('delegate/', CreateDelegationRequestHandler.as_view() , name='delegating'),

]