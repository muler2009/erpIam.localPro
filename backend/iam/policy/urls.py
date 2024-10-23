from django.urls import path
from iam.policy.views.get.get_policy_req_handler import GetAllPolicyRequestHandler
from iam.policy.views.get.get_all_views_req_handler import GetAllViews
from iam.policy.views.get.get_action_req_handler import GetAllPolicyActionRequestHandler
from iam.policy.views.get.ger_olb_policy_req_handler import GetAllOLBPolicyRequestHandler
from iam.policy.views.get.action_access_level import ViewListGet, ViewListPost, ViewListDelete, ViewListPut
from iam.policy.views.get.get_model_level_actions import ModelActionGetView, ModelActionDeleteView, ModelActionPostView
from iam.policy.views.post.create_policy_modified import CreatePolicyRequestHandler
from iam.policy.views.get.get_all_project_model import GetProjectModelRequestHandler
from iam.policy.views.get.get_appmodel_level_policy_req_handler import GetModelLevelPolicyRequestHandler, GetApplicationLevelPolicyRequestHandler

app_name ='policy'

urlpatterns = [
    path('get_policy/', GetAllPolicyRequestHandler.as_view()),
    path('all_views/', GetAllViews.as_view()),

    path('actions/', GetAllPolicyActionRequestHandler.as_view()),
    path('list/', ViewListGet.as_view()),
    path('add/', ViewListPost.as_view()),
    path('change/', ViewListPut.as_view()),
    path('remove/', ViewListDelete.as_view()),


    # url mapping custom managed policy related 
    path('project_model/', GetProjectModelRequestHandler.as_view()),
    path('get_custom_policy/', GetAllOLBPolicyRequestHandler.as_view()),
    path('add_new_policy/', CreatePolicyRequestHandler.as_view()),

    # URLPattern with model-level and app_level
    path('model-level/', GetModelLevelPolicyRequestHandler.as_view()), 
    path('app-level/', GetApplicationLevelPolicyRequestHandler.as_view()), 

    # URLPattern working with model ModelListView
    path('models/<str:model_name>/actions/', ModelActionGetView.as_view()),
    path('models/<str:model_name>/post-actions/', ModelActionPostView.as_view()),
    path('models/<str:model_name>/del-actions/', ModelActionDeleteView.as_view()),

]