from django.urls import path
from dmsmodule.document_repository.views.post.create_document_request_handler import CreateDocumentRequestHandler
from dmsmodule.document_repository.views.get.get_document_req_handler import GetDocumentRequestHandler


urlpatterns = [
    path("create/", CreateDocumentRequestHandler.as_view()),
    path("get/", GetDocumentRequestHandler.as_view())

]