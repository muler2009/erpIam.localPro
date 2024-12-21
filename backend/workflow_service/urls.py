from django.urls import path
from workflow_service.views.post.save_request_req_handler import SaveRequestHandler
from workflow_service.views.post.submit_request_handler import SubmitRequestHandler
from workflow_service.views.get.approval_request_handler import GetApprovalProcess
from workflow_service.views.get.get_saved_request_handler import GetSavedRequestRequestHandler



urlpatterns = [
    path('approval_process/', GetApprovalProcess.as_view()),


    path('request/', GetSavedRequestRequestHandler.as_view()),
    path('save_request/', SaveRequestHandler.as_view()),
    path('submit_request/', SubmitRequestHandler.as_view()), # url patterns to submit a request for approval


]