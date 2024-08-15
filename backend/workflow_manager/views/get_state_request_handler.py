from rest_framework import generics, status
from ..models.workflow_state_model import WorkFlowStateModel
from ..models.request_model import RequestInWorkFlowModel
from ..serilizers.get_state_serializer import GetStateModelSerializer
from ..serilizers.get_request_serializer import RequestSubmissionModelSerializer, RequestModelSerializer
from rest_framework.request import Request
from rest_framework.response import Response
from utils.custom_exception_handler import CustomObjectDoesNotExist

class GetStateRequestHandler(generics.GenericAPIView):
    serializer_class = GetStateModelSerializer
    def get(self, request: Request):
        try:
            state_instance = WorkFlowStateModel.objects.all()
            if not state_instance:
                raise CustomObjectDoesNotExist(message="State Not Found")
            state_serializer = self.serializer_class(state_instance, many=True)
        except CustomObjectDoesNotExist as exc:
            return Response({
                "Error": exc.message,
                "Code": exc.code
            }, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(state_serializer.data)
        

class GetRequesthandler(generics.ListAPIView):
    serializer_class = RequestModelSerializer
    queryset = RequestInWorkFlowModel.objects.all()


