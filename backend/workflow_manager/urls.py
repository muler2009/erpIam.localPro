from django.urls import path
from .views.get_view.get_request_handler import GetRequestSendByUserHandler
from .views.get_view.get_constant_workflow_requestHandler import  GetStateRequestHandler, GetActionsRequestHandler, GetProtocolRequestHandler, GetTransitionRequestHandler
from .views.post_view.send_request_handler import RequestSubmissionHandler
from .views.post_view.perform_transition_request_handler import PerformTransitionRequestHandler
from .views.post_view.approved_request_handler import ApprovedByRequestOwnerHandler, GetFinalApprovedRequest
from .views.get_view.get_request_handler import  GetRequestsReceivedForApprovalRequestHandler
from .views.get_view.get_unapproved_request_of_sender_handler import GetUnapprovedRequestOfSender
from .views.get_view.get_approved_request_of_sender import GetAapprovedRequestsOfTheSender
from .views.get_view.get_intermediate_request_handler import GetIntermediateRequestHandler

from .views.delete_view.delete_requests_handlers import DeleteUserAccountRequestHandler
from .views.get_view.get_approval_stage import GetApprovalStageRequestHander

urlpatterns = [
    path('get/', GetStateRequestHandler.as_view()),  # get the available state workflow 
    path('get_actions/', GetActionsRequestHandler.as_view()),  # get the actions in the work-flow 
    path('get_protocol/', GetProtocolRequestHandler.as_view()),  # get the protocol or processes work-flow 
    path('get_transitions/', GetTransitionRequestHandler.as_view()),  # get the available Transition work-flow 

    # path('get_/', GetUnapprovedRequestOfSender.as_view()),

    path('get_unapproved_request_of_sender/', GetUnapprovedRequestOfSender.as_view()), # list unapproved request by the user before approving ans sending to approval 
    path('get_approved/', GetAapprovedRequestsOfTheSender.as_view()), # list approved requests of the whose state is pending for approval 
    path('get_intermediate_request/', GetIntermediateRequestHandler.as_view()), # list approved requests of the whose state is pending for approval 



    path('approvals/', GetFinalApprovedRequest.as_view()), # Get all the Approved requests of the sender (i.e approved by the approver)
    path('request_recieved/', GetRequestsReceivedForApprovalRequestHandler.as_view()), # url list of requests recieved 

    # creating request handlers
    path('approved_by_owner/', ApprovedByRequestOwnerHandler.as_view()), # post request sendet creator send request
    path('send_request/', RequestSubmissionHandler.as_view()), # sending the request for approval
    path('send_request/<str:request_id>/transition/', PerformTransitionRequestHandler.as_view()), # to perform transition during the approval process

    # delete requests 
    path('delete_unapproved_request/<str:request_id>/', DeleteUserAccountRequestHandler.as_view()), # remove the requests before sending request to approval 




    path('approval_stage/', GetApprovalStageRequestHander.as_view()), # remove the requests before sending request to approval 






]