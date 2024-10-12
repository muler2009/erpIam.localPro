from django.urls import path
from iam.policy.views.get.get_policy_req_handler import GetAllPolicyRequestHandler

urlpatterns =[
    path('get_policy/', GetAllPolicyRequestHandler.as_view())
]