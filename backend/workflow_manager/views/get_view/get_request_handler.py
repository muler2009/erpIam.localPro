from rest_framework import generics, status, permissions
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
        

class GetRequestsRecievedForApprovalRequestHandler(generics.ListAPIView):
    '''
        Get request handler lists requests sent 
        for the specific user
    
    '''
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = GetApprovedRequestModelSerializer

    def get_queryset(self):
        state_name = self.request.query_params.get("current_state")

        # if not state_name:
        #     raise EmptyExceptionHandler(detail="State name not provided.")

        state = get_object_or_404(WorkFlowStateModel, state_name=state_name)
        queryset = ApprovedRequestByRequestOwnerModel.objects.filter(
            request_assigned_to_user=self.request.user,
            current_state=state
        )
        return queryset

    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        try: 
            if not queryset.exists():
                raise EmptyExceptionHandler(message="No requests found for this user.")
            serializer = self.serializer_class(queryset, many=True, context={'request': request})
            return Response(serializer.data)
        except EmptyExceptionHandler as exc:
            return  Response({"status_code": 400, "status_text": exc.message})
    
        
        
