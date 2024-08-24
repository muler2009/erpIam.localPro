from rest_framework import generics, status, permissions
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from utils.custom_exception_handler import PostExceptionHandler, EmptyExceptionHandler
from ...models.request_model import UnApprovedRequestByOwnerModel, ApprovedRequestByRequestOwnerModel, ApprovedRequestsModel
from ...models.workflow_action_model import WorkFlowActionsModel
from ...models.workflow_transition_model import WorkFlowTransitionModel

from ...serilizers.send_request_serializer import ApprovedRequestsByRequestSerializer, UnApprovedRequestSerializer
from ...serilizers.get_request_serializer import GetFinalApprovedRequestModelSerializer


class ApprovedByRequestOwnerHandler(generics.GenericAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UnApprovedRequestSerializer

    def post(self, request, *args, **kwargs):
        request_id = request.data.get('request_id')
        action_name = request.data.get('action_name')

        if not request_id or not action_name:
            return Response({"detail": "Request ID and action name are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            unapproved_request = UnApprovedRequestByOwnerModel.objects.get(request_id=request_id)
        except UnApprovedRequestByOwnerModel.DoesNotExist:
            return Response({"detail": "Request not found."}, status=status.HTTP_404_NOT_FOUND)

        try:
            action = WorkFlowActionsModel.objects.get(action_name=action_name)
        except WorkFlowActionsModel.DoesNotExist:
            return Response({"detail": f"Action '{action_name}' not found."}, status=status.HTTP_404_NOT_FOUND)

        try:
            transition = WorkFlowTransitionModel.objects.get(
                from_state=unapproved_request.approval_status,
                action_name=action
            )
        except WorkFlowTransitionModel.DoesNotExist:
            return Response({"detail": "Transition not allowed for this action."}, status=status.HTTP_400_BAD_REQUEST)

        # Perform the actual transition
        unapproved_request.approval_status = transition.to_state

        # Create the Approved request
        approved_request = ApprovedRequestByRequestOwnerModel.objects.create(
            title=unapproved_request.title,
            requesting_user=unapproved_request.requesting_user,
            request_assigned_to_user=unapproved_request.request_assigned_to_user,
            request_type=unapproved_request.request_type,
            current_state=transition.to_state,  # Set the state from transition
            file_for_approval=unapproved_request.file_for_approval
        )

        # Save the Approved request and delete the UnApproved request
        approved_request.save()
        unapproved_request.delete()

        # Serialize and return the approved request
        serializer = ApprovedRequestsByRequestSerializer(approved_request)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    

    
class GetFinalApprovedRequest(generics.ListAPIView):
    serializer_class = GetFinalApprovedRequestModelSerializer
    queryset = ApprovedRequestsModel.objects.all()

    def get(self, request: Request, *args, **kwargs):
        user = request.user
        try:
            approved_request= ApprovedRequestsModel.objects.filter(requesting_user=user)
            if not approved_request:
                raise EmptyExceptionHandler(message="No Approved request Found", error_type='ERROR')
            approved_requests_seriallizer = self.serializer_class(approved_request, many=True, context={'request': request})
            return Response(approved_requests_seriallizer.data, status=status.HTTP_200_OK)

        except EmptyExceptionHandler as exc:
            return Response({
                'Error': exc.message,
                'error_type': exc.error_type
            })
    

