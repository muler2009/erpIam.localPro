from django.urls import path
from dmsmodule.file_mangement.views.create_upload_request_handler import UploadDocumentView
from dmsmodule.file_mangement.views.get_upload_request_handler import GetDocumentRequestHandler


urlpatterns = [
    path('get_all_files/', GetDocumentRequestHandler.as_view()),
    path('documents/<int:folder_identifier>/', GetDocumentRequestHandler.as_view(), name='get-documents'),
]