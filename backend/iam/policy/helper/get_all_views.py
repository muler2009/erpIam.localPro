from django.urls import get_resolver, URLPattern, URLResolver
from rest_framework import generics



# def extract_views_from_urlpatterns(urlpatterns):
#     """
#     Recursively extract views, their names, and actions from urlpatterns, handling included URLs.
#     Returns a list of dictionaries in the desired structure.
#     """
#     view_actions = []  # Initialize an empty list to store the views and actions.

#     for pattern in urlpatterns:  # Loop through each URL pattern in the given list (urlpatterns).
#         if isinstance(pattern, URLPattern):  # Check if the current pattern is a direct URL pattern.
#             callback = pattern.callback  # Get the view function or class associated with this URL pattern.

#             # Check if the pattern's callback has a `view_class` attribute (indicating a class-based view).
#             if hasattr(callback, 'view_class'):
#                 view = callback.view_class  # Get the class of the view.

#                 # Check if the view is a subclass of `GenericAPIView`.
#                 if issubclass(view, generics.GenericAPIView):
#                     try:
#                         # Attempt to get the model associated with the view's queryset.
#                         model = view.queryset.model if hasattr(view, 'queryset') else None

#                         if model:
#                             actions = []  # Initialize an empty list to store actions.

#                             # Check for HTTP method handlers and add the corresponding actions.
#                             if hasattr(view, 'get'):
#                                 actions.append('retrieve (GET)')
#                             if hasattr(view, 'post'):
#                                 actions.append('create (POST)')
#                             if hasattr(view, 'put'):
#                                 actions.append('update (PUT)')
#                             if hasattr(view, 'delete'):
#                                 actions.append('delete (DELETE)')
#                             if hasattr(view, 'patch'):
#                                 actions.append('partial_update (PATCH)')

#                             # Append a dictionary containing model name, view name, and actions to the list.
#                             view_actions.append({
#                                 model._meta.object_name: [
#                                     view.__name__,
#                                     {"actions": actions}
#                                 ]
#                             })

#                     except AttributeError:
#                         continue  # Skip if there's an error (e.g., the view has no queryset).

#         elif isinstance(pattern, URLResolver):  # If the pattern is an `include()` (nested URLs).
#             # Recursively call `extract_views_from_urlpatterns` on the nested URL patterns.
#             nested_view_actions = extract_views_from_urlpatterns(pattern.url_patterns)
            
#             # Extend the main list with the results from the nested patterns.
#             view_actions.extend(nested_view_actions)

#     return view_actions  # Return the list with all the views and their actions.


def extract_views_from_urlpatterns(urlpatterns):
    """
    Recursively extract views, their names, and actions from urlpatterns, handling included URLs.
    Combines multiple views under a single model entry.
    """
    view_actions = {}  # Initialize an empty dictionary to store the views and actions.

    for pattern in urlpatterns:  # Loop through each URL pattern in the given list (urlpatterns).
        if isinstance(pattern, URLPattern):  # Check if the current pattern is a direct URL pattern (not an include).
            callback = pattern.callback  # Get the view function or class associated with this URL pattern.

            if hasattr(callback, 'view_class'):  # Check if the callback has a `view_class` attribute.
                view = callback.view_class  # Get the class of the view (e.g., `UserView` or `DocumentView`).

                if issubclass(view, generics.GenericAPIView):  # Check if the view is a subclass of `GenericAPIView`.
                    try:

                        model = view.queryset.model if hasattr(view, 'queryset') else None  # Get the associated model.

                        if model:
                            actions = []  # Initialize an empty list to store the actions supported by the view.

                            # Check for HTTP method handlers.
                            if hasattr(view, 'get'):
                                actions.append('retrieve (GET)')
                            if hasattr(view, 'post'):
                                actions.append('create (POST)')
                            if hasattr(view, 'put'):
                                actions.append('update (PUT)')
                            if hasattr(view, 'delete'):
                                actions.append('delete (DELETE)')
                            if hasattr(view, 'patch'):
                                actions.append('partial_update (PATCH)')

                            # If the model is already in the view_actions dictionary, append the new view and actions.
                            model_name = model._meta.object_name
                            if model_name not in view_actions:
                                view_actions[model_name] = []  # Initialize a list if the model isn't present.

                            # Append the view and its actions for this model.
                            view_actions[model_name].append({
                                "view_name": view.__name__,
                                "actions": actions,
                            })
                    except AttributeError:
                        continue

                    

        elif isinstance(pattern, URLResolver):  # If the pattern is an `include()`.
            # Recursively call `extract_views_from_urlpatterns` on the nested URL patterns.
            nested_view_actions = extract_views_from_urlpatterns(pattern.url_patterns)
            # Merge the results from the nested patterns into the main dictionary.
            for model, views in nested_view_actions.items():
                if model not in view_actions:
                    view_actions[model] = []
                view_actions[model].extend(views)  # Add the nested views under the same model.

    return view_actions

def get_all_generic_views():
    """
    Returns a dictionary of all GenericAPIView-based views and their associated actions (mixins).
    Handles both direct URL patterns and included (nested) URLs.
    """
    urlconf = get_resolver()
    return extract_views_from_urlpatterns(urlconf.url_patterns)