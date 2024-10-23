from django.urls import URLPattern, URLResolver
from rest_framework import generics, views

# class BaseViewList(generics.GenericAPIView):
#     def extract_actions(self, urlpatterns, method):
#         """
#         Extracts actions for the specified HTTP method from the urlpatterns.
#         """
#         actions = {}

#         for pattern in urlpatterns:
#             if isinstance(pattern, URLPattern):
#                 callback = pattern.callback

#                 if hasattr(callback, 'view_class'):
#                     view = callback.view_class
                    
#                     # Check if the view is a subclass of GenericAPIView
#                     if issubclass(view, generics.GenericAPIView):
#                         model = None

#                         # Check for queryset attribute
#                         if hasattr(view, 'queryset') and view.queryset is not None:
#                             model = view.queryset.model

#                         if model:
#                             model_name = model._meta.object_name
                            
#                             if model_name not in actions:
#                                 actions[model_name] = []

#                             if method == 'GET' and hasattr(view, 'get'):
#                                 actions[model_name].append({
#                                     "policy_action_name": view.__name__,
#                                     # "action": 'retrieve'
#                                 })
#                             elif method == 'POST' and hasattr(view, 'post'):
#                                 actions[model_name].append({
#                                     "view_name": view.__name__,
#                                     # "action": 'create'
#                                 })
#                             elif method == 'PUT' and hasattr(view, 'put'):
#                                 actions[model_name].append({
#                                     "view_name": view.__name__,
#                                     # "action": 'update'
#                                 })
#                             elif method == 'DELETE' and hasattr(view, 'delete'):
#                                 actions[model_name].append({
#                                     "view_name": view.__name__,
#                                     # "action": 'delete'
#                                 })
#             elif isinstance(pattern, URLResolver):
#                 nested_actions = self.extract_actions(pattern.url_patterns, method)
#                 for model, views in nested_actions.items():
#                     if model not in actions:
#                         actions[model] = []
#                     actions[model].extend(views)

#         return actions




class BaseViewList(generics.GenericAPIView):
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
                    
                    # Check if the view is a subclass of GenericAPIView
                    if issubclass(view, generics.GenericAPIView):
                        model = None

                        # Check for queryset attribute
                        if hasattr(view, 'queryset') and view.queryset is not None:
                            model = view.queryset.model
                            # Apply custom model name using the dictionary

                        if model:
                            model_name = model._meta.object_name
                            # display_name = MODEL_DISPLAY_NAMES.get(model_name, model_name)

                            # Determine the action based on the HTTP method
                            if method == 'GET' and hasattr(view, 'get'):
                                actions.append({
                                    "policy_action_name": f"{view.__name__}- GET"
                                })
                            elif method == 'POST' and hasattr(view, 'post'):
                                actions.append({
                                    "policy_action_name": view.__name__
                                })
                            elif method == 'PUT' and hasattr(view, 'put'):
                                actions.append({
                                    "policy_action_name": view.__name__
                                })
                            elif method == 'DELETE' and hasattr(view, 'delete'):
                                actions.append({
                                    "policy_action_name": view.__name__
                                })
            elif isinstance(pattern, URLResolver):
                nested_actions = self.extract_actions(pattern.url_patterns, method)
                actions.extend(nested_actions)

        return actions