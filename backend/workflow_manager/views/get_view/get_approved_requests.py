from rest_framework import status, generics, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.request import Request
from rest_framework.response import Response
from utils.custom_exception_handler import EmptyExceptionHandler
from ...models.request_model import ApprovedRequestsModel, ApprovedRequestByRequestOwnerModel
from ...models.workflow_state_model import WorkFlowStateModel
from django.db.models import Q
from ...serilizers.get_request_serializer import GetFinalApprovedRequestModelSerializer, GetApprovedRequestModelSerializer


class PendingApprovalsRequestHandler(generics.GenericAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = GetApprovedRequestModelSerializer
    queryset = ApprovedRequestByRequestOwnerModel.objects.all()

    def get(self, request: Request, *args, **kwargs):
        try:
            user = self.get_authenticated_user(request)
            pending_requests = self.get_pending_request_for_approval(user)
              # Serialize the pending requests
            serializer = self.get_serializer(pending_requests, many=True, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        except EmptyExceptionHandler as exc:
            return Response({
                "message": exc.message,
                "error": exc.error_type
            })
            

    def get_authenticated_user(self, request):
        user = request.user
        if not user:
            raise EmptyExceptionHandler(message="No User Found", error_type="NO USER")
        # Check if the user is the initiator of any request
        initiated_requests = ApprovedRequestByRequestOwnerModel.objects.filter(requesting_user=user)
        
        if not initiated_requests.exists():
            raise EmptyExceptionHandler(message="User is not a request initiator", error_type="NOT_INITIATOR")

        return user
   
        
    def get_pending_request_for_approval(self, user):
       
        pending_state = WorkFlowStateModel.objects.get(state_name="pending for approval")
        rejected_state = WorkFlowStateModel.objects.get(state_name="rejected")

       # Filter requests that are in either the "pending for approval" or "rejected" state
        pending_or_rejected_requests = ApprovedRequestByRequestOwnerModel.objects.filter(
            Q(current_state=pending_state) | Q(current_state=rejected_state) 
        )

        if not pending_or_rejected_requests.exists():
            raise EmptyExceptionHandler(message="No Pending or Rejected Requests", error_type="NO_PENDING_OR_REJECTED")
        
        return pending_or_rejected_requests


class GetFinalApprovedRequestHandler(generics.GenericAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = GetApprovedRequestModelSerializer
    queryset = ApprovedRequestByRequestOwnerModel.objects.all()

    def get(self, request: Request, *args, **kwargs):
        user = request.user
        try:
           user = self.get_authenticated_user(request)
           approved_requests = self.get_only_final_approved_requests(request, user)

        except EmptyExceptionHandler as exc:
            return Response({
                'Error': exc.message,
                'error_type': exc.error_type
            })
        else: 
            return Response(approved_requests)
    
    def get_authenticated_user(self, request):
        user = request.user
        if not user:
            raise EmptyExceptionHandler(message="No User Found", error_type="NO USER")
        return user
    
    def get_only_final_approved_requests(self, request, user):
        state_name = self.request.query_params.get("current_state")
        state = WorkFlowStateModel.objects.get(state_name=state_name)
        approved_request= ApprovedRequestByRequestOwnerModel.objects.filter(current_state=state, requesting_user = user)
        if not approved_request:
            raise EmptyExceptionHandler(message="No Approved request Found", error_type='ERROR')
        approved_requests_seriallizer = self.serializer_class(approved_request, many=True, context={'request': request})
        return approved_requests_seriallizer.data
    