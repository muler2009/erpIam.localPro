from django.urls import URLPattern, URLResolver
from rest_framework import generics
from typing import Tuple, Dict, List
from .constant import EXCLUDED_APPS



class ActionExtractorFromURL:
    def __init__(self, method: str):
        self.method = method
        
    # def extract_action_from_url(self, urlpatterns: list) -> Tuple[Dict[str, List[Dict]], Dict[str, List[Dict]]]:
    #     """
    #     Extract actions and categorize into app-level and model-level policies.
    #     """
    #     app_level_policies = {}
    #     model_level_policies = {}

    #     for pattern in urlpatterns:
    #         if isinstance(pattern, URLPattern):
    #             self.pattern_processor(pattern, app_level_policies, app_level_policies)
    #         elif isinstance(pattern, URLResolver):
    #             nested_app_level, nested_model_level = self.extract_action_from_url(pattern.url_patterns)
    #             self._merge_policies(app_level_policies, nested_app_level)
    #             self._merge_policies(model_level_policies, nested_model_level)

    #         return app_level_policies, model_level_policies
        
    # def pattern_processor(self, pattern, app_level_policies, model_level_policies):
    #     """
    #     Process a URL pattern and categorize the actions.
    #     """
    #     callback = pattern.callback

    #     if hasattr(callback, 'view_class'):
    #         view = callback.view_class

    #         if issubclass(view, generics.GenericAPIView):
    #             model = getattr(view, 'queryset', None).model if hasattr(view, 'queryset') and view.queryset is not None else None

    #             if model:
    #                 app_name = model._meta.app_label
    #                 model_name = model._meta.object_name

    #                 # App-Level actions
    #                 self._add_action(app_level_policies, app_name, view, self.method)

    #                 # Model-Level action 
    #                 self._add_action(model_level_policies, model_name, view, self.method)


    # def _add_action(self, actions_dict, key, view, method):
    #     """
    #     Add a policy to the respective dictionary.
    #     """
    #     if key not in actions_dict:
    #         actions_dict[key] = []

    #     action_name = f"{view.__name__} - {method}"
    #     actions_dict[key].append({"policy_action_name": action_name})


    
    # def _merge_policies(self, main_policies, nested_policies):
    #     """
    #     Merge nested policies into the main policy dictionaries.
    #     """
    #     for key, actions in nested_policies.items():
    #         if key not in main_policies:
    #             main_policies[key] = []
    #         main_policies[key].extend(actions)

    def extract_policies(self, urlpatterns: list) -> Tuple[Dict[str, List[Dict]], Dict[str, List[Dict]]]:
        """
        Extract actions and categorize into app-level and model-level policies.
        """
        app_level_policies = {}
        model_level_policies = {}

        for pattern in urlpatterns:
            if isinstance(pattern, URLPattern):
                self._process_pattern(pattern, app_level_policies, model_level_policies)
            elif isinstance(pattern, URLResolver):
                nested_app_level, nested_model_level = self.extract_policies(pattern.url_patterns)
                self._merge_policies(app_level_policies, nested_app_level)
                self._merge_policies(model_level_policies, nested_model_level)

        return app_level_policies, model_level_policies

    def _process_pattern(self, pattern, app_level_policies, model_level_policies):
        """
        Process a URL pattern and categorize the actions.
        """
        callback = pattern.callback

        if hasattr(callback, 'view_class'):
            view = callback.view_class

            if issubclass(view, generics.GenericAPIView):
                model = getattr(view, 'queryset', None).model if hasattr(view, 'queryset') and view.queryset is not None else None

                if model:
                    app_name = model._meta.app_label
                    model_name = model._meta.object_name

                    # App-Level Policy
                    self._add_policy(app_level_policies, app_name, view, self.method)

                    # Model-Level Policy
                    self._add_policy(model_level_policies, model_name, view, self.method)
                    

    def _add_policy(self, policies_dict, key, view, method):
        """
        Add a policy to the respective dictionary.
        """
        if key not in policies_dict:
            policies_dict[key] = []

        action_name = f"{view.__name__} - {method}"
        policies_dict[key].append({"policy_action_name": action_name})

    def _merge_policies(self, main_policies, nested_policies):
        """
        Merge nested policies into the main policy dictionaries.
        """
        for key, actions in nested_policies.items():
            if key not in main_policies:
                main_policies[key] = []
            main_policies[key].extend(actions)

    def _process_pattern(self, pattern, app_level_policies, model_level_policies):
        callback = pattern.callback

        if hasattr(callback, 'view_class'):
            view = callback.view_class

            if issubclass(view, generics.GenericAPIView):
                model = getattr(view, 'queryset', None).model if hasattr(view, 'queryset') and view.queryset is not None else None

                if model:
                    app_name = model._meta.app_label
                    model_name = model._meta.object_name

                    # Exclude specific apps
                    if app_name not in EXCLUDED_APPS:
                        # App-Level Policy
                        self._add_policy(app_level_policies, app_name, view, self.method)

                        # Model-Level Policy
                        self._add_policy(model_level_policies, model_name, view, self.method)
