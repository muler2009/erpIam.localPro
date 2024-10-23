from django.urls import get_resolver, URLPattern, URLResolver
from ...helper.base_class import BaseViewList
from ...helper.model_level_action_extractor import ModelLevelActionExtractor
from rest_framework.response import Response


class ModelActionGetView(BaseViewList):
    """
    This view returns the actions associated with a specific model.
    """
    def get(self, request, *args, **kwargs):
        model_name = kwargs.get('model_name')
        urlpatterns = get_resolver().url_patterns

        # Extract actions for the specified model
        model_action_extractor = ModelLevelActionExtractor()
        model_policies = model_action_extractor.extract_actions(urlpatterns, 'GET')
        
        # Filter actions based on the model name
        filtered_actions = [action for action in model_policies if action.get('model_name') == model_name]

        return Response(filtered_actions)
    
class ModelActionPostView(BaseViewList):
    """
    This view returns the actions associated with a specific model.
    """
    def get(self, request, *args, **kwargs):
        model_name = kwargs.get('model_name')
        urlpatterns = get_resolver().url_patterns

        # Extract actions for the specified model
        model_action_extractor = ModelLevelActionExtractor()
        model_policies = model_action_extractor.extract_actions(urlpatterns, 'POST')
        
        # Filter actions based on the model name
        filtered_actions = [action for action in model_policies if action.get('model_name') == model_name]

        return Response(filtered_actions)
    
    
class ModelActionDeleteView(BaseViewList):
    """
    This view returns the actions associated with a specific model.
    """
    def get(self, request, *args, **kwargs):
        model_name = kwargs.get('model_name')
        urlpatterns = get_resolver().url_patterns

        # Extract actions for the specified model
        model_action_extractor = ModelLevelActionExtractor()
        model_policies = model_action_extractor.extract_actions(urlpatterns, 'DELETTE')
        
        # Filter actions based on the model name
        filtered_actions = [action for action in model_policies if action.get('model_name') == model_name]

        return Response(filtered_actions)