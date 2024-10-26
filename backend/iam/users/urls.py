from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from iam.users.views.get_user_account_request_handler import GetUserRequestAccountHandler
from iam.users.views.create_user_account_request_handler import CreateUserAccountRequestHandler
from iam.users.views.update_user_account_request_handler import UpdateUserAccountRequestHandler
from iam.users.views.delete_user_account_request_handler import DeleteUserAccountRequestHandler
from iam.users.views.authentication_request_handler import AuthenticationRequestHandler, UserLogoutRequestHandler
from iam.users.views.get_user_group_request_handler import GetUserGroupRequestHandler
from iam.users.views.post.user_registration_req_handler import RegisterViewRequestHandler
from iam.users.views.get.search_user_request_handler import SearchUserRequestHandler
from iam.users.views.post.deactivate_account import AccountDeactivationRequestHandler
from iam.users.views.get.get_deactivated_account_req_handler import GetDeactivatedAccountOnlyRequestHandler

urlpatterns = [
    path('login/', AuthenticationRequestHandler.as_view()),
    path('logout/', UserLogoutRequestHandler.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('token/verify/', TokenVerifyView.as_view()),

    path('get_account/', GetUserRequestAccountHandler.as_view()),
    path('create_account/', CreateUserAccountRequestHandler.as_view()),
    path('update/<str:user_account_id>/', UpdateUserAccountRequestHandler.as_view()),
    path('delete/<str:user_account_id>/', DeleteUserAccountRequestHandler.as_view()),


    path('get_user_group/', GetUserGroupRequestHandler.as_view()),
    path('register_user/', RegisterViewRequestHandler.as_view(), name='register_user'),


    #URL Pattern related to activation and deactivation
    path('deactivate/<str:user_account_id>/', AccountDeactivationRequestHandler.as_view(), name='deactivate_account'), 
    path('deactivated/', GetDeactivatedAccountOnlyRequestHandler.as_view(), name='deactivated_account'), 



    # URLPattern for searching
    path('search_user/' , SearchUserRequestHandler.as_view(), name="search-user"), 

]