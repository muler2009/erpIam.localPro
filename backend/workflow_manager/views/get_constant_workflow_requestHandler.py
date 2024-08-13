from rest_framework import generics, status
from ..models.workflow_action_model import WorkFlowActionsModel
from ..models.workflow_protocol_model import WorkFlowProtocolModel
from ..models.workflow_transition_model import WorkFlowTransitionModel
from ..serilizers.get_constant_serializer import GetTransitionModelSerializer, GetActionModelSerializer, GetProtocolModelSerializer
from rest_framework.request import Request
from rest_framework.response import Response
from utils.custom_exception_handler import CustomObjectDoesNotExist

class GetProtocolRequestHandler(generics.GenericAPIView):
    serializer_class = GetProtocolModelSerializer
    def get(self, request: Request):
        try:
            protocol_instance = WorkFlowProtocolModel.objects.all()
            if not protocol_instance:
                raise CustomObjectDoesNotExist(message="Request Type Not Found")
            protocol_serializer = self.serializer_class(protocol_instance, many=True)
        except CustomObjectDoesNotExist as exc:
            return Response({
                "Error": exc.message,
                "Code": exc.code
            }, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(protocol_serializer.data)

class GetActionsRequestHandler(generics.GenericAPIView):
    serializer_class = GetActionModelSerializer
    def get(self, request: Request):
        try:
            action_instance = WorkFlowActionsModel.objects.all()
            if not action_instance:
                raise CustomObjectDoesNotExist(message="No Action Not Found")
            action_serializer = self.serializer_class(action_instance, many=True)
        except CustomObjectDoesNotExist as exc:
            return Response({
                "Error": exc.message,
                "Code": exc.code
            }, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(action_serializer.data)
        
class GetTransitionRequestHandler(generics.GenericAPIView):
    serializer_class = GetTransitionModelSerializer
    def get(self, request: Request):
        try:
            transition_instance = WorkFlowTransitionModel.objects.all()
            if not transition_instance:
                raise CustomObjectDoesNotExist(message="No Action Not Found")
            transition_serializer = self.serializer_class(transition_instance, many=True)
        except CustomObjectDoesNotExist as exc:
            return Response({
                "Error": exc.message,
                "Code": exc.code
            }, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(transition_serializer.data)