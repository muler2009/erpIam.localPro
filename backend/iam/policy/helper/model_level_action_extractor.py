from django.urls import URLPattern, URLResolver
from rest_framework import generics


class ModelLevelActionExtractor:
    
    def __init__(self):
        pass


    def extract_actions(self, urlpatterns, method):
        """
        Extracts actions for the specified HTTP method from the urlpatterns.
        """
        actions = []

        for pattern in urlpatterns:
            if isinstance(pattern, URLPattern):
                callback = pattern.callback

                if hasattr(callback, 'view_class'):
                    view = callback.view_class

                    if issubclass(view, generics.GenericAPIView):
                        model = None

                        if hasattr(view, 'queryset') and view.queryset is not None:
                            model = view.queryset.model

                        if model:
                            model_name = model._meta.object_name

                            # Determine the action based on the HTTP method
                            if method == 'GET' and hasattr(view, 'get'):
                                actions.append({
                                    "model_name": model_name,
                                    "policy_action_name": f"{view.__name__}- GET"
                                })
                            elif method == 'POST' and hasattr(view, 'post'):
                                actions.append({
                                    "model_name": model_name,
                                    "policy_action_name": f"{view.__name__}- POST"
                                })
                            elif method == 'PUT' and hasattr(view, 'put'):
                                actions.append({
                                    "model_name": model_name,
                                    "policy_action_name": f"{view.__name__}- PUT"
                                })
                            elif method == 'DELETE' and hasattr(view, 'delete'):
                                actions.append({
                                    "model_name": model_name,
                                    "policy_action_name": f"{view.__name__}- DELETE"
                                })
            elif isinstance(pattern, URLResolver):
                nested_actions = self.extract_actions(pattern.url_patterns, method)
                actions.extend(nested_actions)

        return actions