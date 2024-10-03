from django.urls import path, include
from dmsmodule.folder.views.create_folder_request_handler import CreateFolderRequestHandler
from dmsmodule.folder.views.get_folder_request_handler import GetFolderRequestHandler
from dmsmodule.folder.views.search_folder_request_handler import SearchFolderRequestHandler
from dmsmodule.folder.views.get_folder_request_handler import FolderListView



urlpatterns = [
    path('create_folder/', CreateFolderRequestHandler.as_view()),
    path('get_folder/', GetFolderRequestHandler.as_view()),
    path('get/<int:folder_id>/' , GetFolderRequestHandler.as_view()),
    path('search_folder/' , SearchFolderRequestHandler.as_view(), name="search-folder"),
    path('folders-content/' , FolderListView.as_view(), name="folder-content"),


] 