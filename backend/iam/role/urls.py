from django.urls import path
from iam.role.views.create_role_request_handler import CreateRoleModelInstanceRequestHandler
from iam.role.views.get_role_request_handler import GetIamRoleInstanceRequestHandler
from iam.role.views.delete_role_request_handler import DeleteIamModelInstanceRequestHandler
from iam.role.views.get.get_single_role_req_handler import GetSingleRoleRequestHandler

urlpatterns = [
    path('get_role/', GetIamRoleInstanceRequestHandler.as_view()),
    path('role/<str:role_id>/', GetSingleRoleRequestHandler.as_view()),
    path('create_role/', CreateRoleModelInstanceRequestHandler.as_view()),
    path('delete/<str:role_id>/', DeleteIamModelInstanceRequestHandler.as_view())
]