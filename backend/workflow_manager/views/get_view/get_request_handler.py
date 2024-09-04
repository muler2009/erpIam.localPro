from rest_framework import generics, status, permissions, serializers
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.authentication import JWTAuthentication
from ...models.request_model import ApprovedRequestByRequestOwnerModel, UnApprovedRequestByOwnerModel, ApprovedRequestsModel
from ...serilizers.get_request_serializer import GetApprovedRequestModelSerializer, GetUnapprovedRequestModelSerializer, GetFinalApprovedRequestModelSerializer
from rest_framework.request import Request
from rest_framework.response import Response
from utils.custom_exception_handler import EmptyExceptionHandler
import uuid
from ...models.workflow_state_model import WorkFlowStateModel
from ...serilizers.send_request_serializer import UnApprovedRequestSerializer
from ...models.intermediate_request import IntermediateRequestModel
from ...serilizers.get_intermediate_request_serializer import GetIntermediateRequestModelSerializer
from django.db.models import Q
import logging

logger = logging.getLogger(__name__)
    
class GetRequestSendByUserHandler(generics.GenericAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = GetUnapprovedRequestModelSerializer

    def get(self, request: Request, *args, **kwargs):
        user = request.user
        try: 
            requests = UnApprovedRequestByOwnerModel.objects.filter(requesting_user=user)
            if not requests:
                raise EmptyExceptionHandler(message="No Associated request Found", error_type='ERROR')
            serializer = self.serializer_class(requests, many=True)
            return Response(serializer.data)

        except EmptyExceptionHandler as exc:
            return Response({
                'Error': exc.message,
                'error_type': exc.error_type
            })
        
class GetRequestsReceivedForApprovalRequestHandler(generics.GenericAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = GetIntermediateRequestModelSerializer
    queryset = IntermediateRequestModel.objects.all()

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
            raise EmptyExceptionHandler(message="No User Found", error_type="NO_USER")
        return user

    def get_pending_request_for_approval(self, user):
        state_name = self.request.query_params.get("current_state")
        if not state_name:
            raise EmptyExceptionHandler(message="State name parameter missing", error_type="MISSING_STATE_NAME")

        pending_state = WorkFlowStateModel.objects.get(state_name=state_name)
        user_roles = user.roles.all().values_list('role_name', flat=True)

        # Fetch requests where the current stage is pending and was previously approved by the user
        pending_or_rejected_requests = IntermediateRequestModel.objects.filter(
            request__current_state=pending_state,
            request__current_stage__role__role_name__in=user_roles,
            # user=user
            # request__previous_stage=user  # assuming `approved_by` is a field in `previous_stage`
        ).select_related('request')

        if not pending_or_rejected_requests.exists():
            raise EmptyExceptionHandler(message="No Pending or Rejected Requests", error_type="NO_PENDING_OR_REJECTED")

        # Manually deduplicate the requests
        unique_requests = {}
        for request_instance in pending_or_rejected_requests:
            request_id = request_instance.request.request_id
            if request_id not in unique_requests:
                unique_requests[request_id] = request_instance

        return list(unique_requests.values())
    












        
class GetRequestsReceivedForApprovalRequestHandler3(generics.ListAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = GetIntermediateRequestModelSerializer

    def get_queryset(self):
        # Retrieve the 'current_state' parameter from the query string
        state_name = self.request.query_params.get("current_state")

        # Get the user's roles
        user_roles = self.request.user.roles.all().values_list('role_name', flat=True)
        if not user_roles:
            raise serializers.ValidationError({"detail": "User roles not found."})       

        # Handle case when state_name is provided
        if state_name:
            state = get_object_or_404(WorkFlowStateModel, state_name=state_name)
            queryset = IntermediateRequestModel.objects.filter(
                request__current_state=state,
                request__current_stage__role__role_name__in=user_roles
            ).select_related('request').distinct()
        else:
            # Handle case when state_name is not provided
            queryset = IntermediateRequestModel.objects.filter(
                request__current_stage__role__role_name__in=user_roles
            ).select_related('request__current_stage__role__role_name').distinct()

        # Log the generated queryset for debugging
        # logger.info(f"Generated queryset: {queryset.query}")
        # logger.info(f"Queryset count: {queryset.count()}")

        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        if not queryset.exists():
            return Response({"detail": "No requests found for this user."}, status=status.HTTP_404_NOT_FOUND)
        
        # Serialize the queryset data
        serializer = self.serializer_class(queryset, many=True, context={'request': request})
        return Response(serializer.data)




# class GetRequestsReceivedForApprovalRequestHandler2(generics.ListAPIView):
#     """
#     Get request handler lists requests sent for the specific user
#     """
#     authentication_classes = [JWTAuthentication]
#     permission_classes = [permissions.IsAuthenticated]
#     serializer_class = GetApprovedRequestModelSerializer

#     def get_queryset(self, request):
#         # Retrieve the current state from query parameters
#         state_name = self.request.query_params.get("current_state")

#         # If no state name is provided, raise a custom exception
#         if not state_name:
#             raise serializers.ValidationError({"detail": "State name not provided."})

#         # Attempt to retrieve the state object based on the state name
#         state = get_object_or_404(WorkFlowStateModel, state_name=state_name)

#         # Retrieve the requests assigned to the user in the specified state
#         queryset = ApprovedRequestByRequestOwnerModel.objects.filter(
#            request_assigned_to_user=request.user,
#            current_state=state
#         )

#         return queryset

#     def list(self, request, *args, **kwargs):
#         queryset = self.get_queryset(request)
#         if not queryset.exists():
#             return Response({"detail": "No requests found for this user."}, status=status.HTTP_404_NOT_FOUND)
        
#         # Serialize the queryset data
#         serializer = self.serializer_class(queryset, many=True, context={'request': request})
#         return Response(serializer.data)



        
        
