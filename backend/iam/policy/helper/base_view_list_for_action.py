from rest_framework.response import Response
from rest_framework import generics
from django.urls import get_resolver
from .action_extractor import ActionExtractorFromURL

class BaseViewList(generics.GenericAPIView):
    def get_policies(self, method: str):
        urlpatterns = get_resolver().url_patterns
        extractor = ActionExtractorFromURL(method)
        app_level_policies, model_level_policies = extractor.extract_policies(urlpatterns)
        return app_level_policies, model_level_policies

    def get(self, request, *args, **kwargs):
        app_policies, model_policies = self.get_policies('GET')
        return Response({
            "app_level_policies": app_policies,
            "model_level_policies": model_policies
        })
    
    def post(self, request, *args, **kwargs):
        app_policies, model_policies = self.get_policies('POST')
        return Response({
            "app_level_policies": app_policies,
            "model_level_policies": model_policies
        })