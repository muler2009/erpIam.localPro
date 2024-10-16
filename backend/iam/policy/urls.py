from django.urls import path
from iam.policy.views.get.get_policy_req_handler import GetAllPolicyRequestHandler
from iam.policy.views.get.get_all_views_req_handler import GetAllViews
from iam.policy.views.get.get_action_req_handler import GetAllPolicyActionRequestHandler
from iam.policy.views.get.action_access_level import ViewListGet, ViewListPost, ViewListDelete, ViewListPut
from iam.policy.views.post.create_policy_modified import PolicyCreateView



app_name ='policy'

urlpatterns =[
    path('get_policy/', GetAllPolicyRequestHandler.as_view()),
    path('all_views/', GetAllViews.as_view()),

    path('actions/', GetAllPolicyActionRequestHandler.as_view()),
    path('list/', ViewListGet.as_view()),
    path('add/', ViewListPost.as_view()),
    path('change/', ViewListPut.as_view()),
    path('remove/', ViewListDelete.as_view()),

    path('policy_add/', PolicyCreateView.as_view()),


    


]