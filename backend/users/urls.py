from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from users.views.get_user_account_request_handler import GetUserRequestAccountHandler
from users.views.create_user_account_request_handler import CreateUserAccountRequestHandler
from users.views.update_user_account_request_handler import UpdateUserAccountRequestHandler
from users.views.delete_user_account_request_handler import DeleteUserAccountRequestHandler
from users.views.authentication_request_handler import AuthenticationRequestHandler, UserLogoutRequestHandler

urlpatterns = [
    path('login/', AuthenticationRequestHandler.as_view()),
    path('logout/', UserLogoutRequestHandler.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('token/verify/', TokenVerifyView.as_view()),

    path('get_account/', GetUserRequestAccountHandler.as_view()),
    path('create_account/', CreateUserAccountRequestHandler.as_view()),
    path('update/<str:user_account_id>/', UpdateUserAccountRequestHandler.as_view()),
    path('delete/<str:user_account_id>/', DeleteUserAccountRequestHandler.as_view()),
]