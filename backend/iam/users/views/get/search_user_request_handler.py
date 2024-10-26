from django.db.models import Q
from rest_framework import generics, mixins, status, permissions
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.filters import SearchFilter
from iam.models import UserAccountsModel
from ...serializers.get_user_account_serializer import GetUserAccountSerializer

class SearchUserRequestHandler(generics.GenericAPIView, mixins.ListModelMixin):
    # permission_classes = [permissions.IsAdminUser]
    queryset = UserAccountsModel.objects.all()
    serializer_class = GetUserAccountSerializer
    filter_backends = [SearchFilter] 
    search_fields = ['first_name', 'last_name']

    def get(self, request:Request):
        search_query = request.query_params.get('search', None)
        if search_query:
            filtered_queryset = self.get_queryset().filter(
                Q(first_name__icontains=search_query) or Q(last_name__icontains=search_query)
            )
        else:
            filtered_queryset = self.get_queryset()

        seriailizer =self.serializer_class(filtered_queryset, many=True)

        return Response(seriailizer.data, status=status.HTTP_200_OK)