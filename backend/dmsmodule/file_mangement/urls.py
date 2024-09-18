from django.urls import path
from dmsmodule.file_mangement.views.create_upload_request_handler import UploadDocumentView
from dmsmodule.file_mangement.views.get_upload_request_handler import GetDocumentRequestHandler
from dmsmodule.file_mangement.views.post.document_version_request_handler import DocumentVersionRequestHandler
from dmsmodule.file_mangement.views.post.upload_new_document_request_handler import UploadNewDocumentRequestHndler
from dmsmodule.file_mangement.views.get_requests.get_document_verions_Req_handler import GetDocumentVerisonRequestHandler



urlpatterns = [
    path('get_all_files/', GetDocumentRequestHandler.as_view()),
    path('documents/<int:folder_identifier>/', GetDocumentRequestHandler.as_view(), name='get-documents'),

    # URL related to file uploads 
    path('upload-document/', UploadNewDocumentRequestHndler.as_view(), name='document-list-create'),
    path('documents/<str:document_id>/versions/', DocumentVersionRequestHandler.as_view(), name='document-version-create'),

    path('get-doc/', GetDocumentVerisonRequestHandler.as_view(), name='get-document-info')

]