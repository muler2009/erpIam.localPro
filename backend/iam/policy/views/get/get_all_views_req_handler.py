from rest_framework import views
from django.urls import get_resolver
from rest_framework.response import Response
from ...helper.get_all_views import extract_views_from_urlpatterns
from ...models.actions_model import PolicyAction
from django.db import transaction


class GetAllViews(views.APIView):
    def get(self, request, *args, **kwargs):
        urlpatterns = get_resolver().url_patterns  # Get the root URL patterns.
        view_actions = extract_views_from_urlpatterns(urlpatterns)  # Extract the views and actions.

        # Store the actions in the PolicyAction model
        self.store_actions_in_policy(view_actions)  

        return Response(view_actions)  # Return the response with the view actions.

    def store_actions_in_policy(self, view_actions):
        with transaction.atomic():  # Use a transaction to ensure atomicity.
            for model_name, actions in view_actions.items():
                for action_info in actions:
                    view_name = action_info['view_name']
                    for action in action_info['actions']:
                        # You might want to format the action to store it consistently
                        action_name = f"{view_name}_{action.split(' ')[0].lower()}"  # Example: "CreateUserAccountRequestHandler_create"

                        # Create or update the PolicyAction instance
                        PolicyAction.objects.update_or_create(
                            policy_action_name=action_name,
                            defaults={'policy_action_name': action_name}  # You can add more fields if needed
                        )