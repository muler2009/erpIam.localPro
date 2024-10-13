from django.urls import path
from iam.policy.views.get.get_policy_req_handler import GetAllPolicyRequestHandler
from iam.policy.views.get.get_all_views_req_handler import GetAllViews



app_name ='policy'

urlpatterns =[
    path('get_policy/', GetAllPolicyRequestHandler.as_view()),
    path('all_views/', GetAllViews.as_view())

]