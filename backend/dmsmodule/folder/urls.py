from django.urls import path, include
from dmsmodule.folder.views.create_folder_request_handler import CreateFolderRequestHandler
from dmsmodule.folder.views.get_folder_request_handler import GetFolderRequestHandler


urlpatterns = [
    path('create/', CreateFolderRequestHandler.as_view()),
    path('get/', GetFolderRequestHandler.as_view()),
    path('get/<int:folder_id>/' , GetFolderRequestHandler.as_view()),
]