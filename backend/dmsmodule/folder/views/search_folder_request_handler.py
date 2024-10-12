from django.db.models import Q
from rest_framework import generics, mixins, status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.filters import SearchFilter
from ..models.models import FolderModel
from ..serializers.get_folder_serializer import GetFolderSerializer
from ..access_policies import FolderViewAccessPolicy

class SearchFolderRequestHandler(generics.GenericAPIView, mixins.ListModelMixin):
    permission_classes = [FolderViewAccessPolicy]
    queryset = FolderModel.objects.all()
    serializer_class = GetFolderSerializer
    filter_backends = [SearchFilter] 
    search_fields = ['folder_name']

    def get_queryset(self):
        return self.permission_classes[0].scope_queryset(self.request, self.queryset)

    def get(self, request:Request):
        search_query = request.query_params.get('search', None)
        if search_query:
            filtered_queryset = self.get_queryset().filter(
                Q(folder_name__icontains=search_query)
            )
        else:
            filtered_queryset = self.get_queryset()

        seriailizer =self.serializer_class(filtered_queryset, many=True)

        return Response(seriailizer.data, status=status.HTTP_200_OK)