from django.urls import get_resolver, URLPattern, URLResolver
from rest_framework.response import Response
from ...helper.base_class import BaseViewList
from rest_framework import generics
  

class ViewListGet(BaseViewList):
    def get(self, request, *args, **kwargs):
        urlpatterns = get_resolver().url_patterns
        actions = self.extract_actions(urlpatterns, 'GET')
        return Response(actions)

class ViewListPost(BaseViewList):
    def get(self, request, *args, **kwargs):
        urlpatterns = get_resolver().url_patterns
        actions = self.extract_actions(urlpatterns, 'POST')
        return Response(actions)

class ViewListPut(BaseViewList):
    def get(self, request, *args, **kwargs):
        urlpatterns = get_resolver().url_patterns
        actions = self.extract_actions(urlpatterns, 'PUT')
        return Response(actions)

class ViewListDelete(BaseViewList):
    def get(self, request, *args, **kwargs):
        urlpatterns = get_resolver().url_patterns
        actions = self.extract_actions(urlpatterns, 'DELETE')
        return Response(actions)

