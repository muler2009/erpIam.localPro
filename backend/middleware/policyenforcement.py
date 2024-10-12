from django.http import JsonResponse
from django.utils.deprecation import MiddlewareMixin
from iam.models import UserAccountsModel
from iam.policy.models import CustomPolicy

class PolicyEnforcementMiddleware(MiddlewareMixin):
    """
    Middleware to enforce policies attached to users or roles
    """
    def process_view(self, request, view_func, view_args, view_kwargs):
        user = request.user

        if not user.is_authenticated:
            return JsonResponse({'detail': 'Authentication credentials were not provided.'}, status=401)

        # Get the required action from the view function (you may have to map actions to views)
        required_action = self.get_required_action(view_func)
        
        # Check user's policies
        if not self.has_permission(user, required_action):
            return JsonResponse({'detail': 'You do not have permission to perform this action.'}, status=403)

        # Let the request proceed if the policy check passes
        return None

    def has_permission(self, user, action):
        """
        Checks if the user or their role has the necessary policy for the given action
        """
        # Check policies attached directly to the user
        user_policies = user.policies.all().select_related('policy')

        # Get roles the user belongs to and their policies
        user_roles = user.groups.all()  # Assuming you are using Django's Group model

        # Check if any policy attached to the user or their roles allows the action
        for user_policy in user_policies:
            if self.is_action_allowed(user_policy.policy, action):
                return True

        for role in user_roles:
            role_policies = role.policies.all().select_related('policy')
            for role_policy in role_policies:
                if self.is_action_allowed(role_policy.policy, action):
                    return True

        return False

    def is_action_allowed(self, policy, action):
        """
        Check if the policy allows the action
        """
        # Check if the action is allowed by the policy
        if action in policy.actions and policy.effect == 'allow':
            return True
        return False

    def get_required_action(self, view_func):
        """
        Determines the required action based on the view function being accessed
        """
        # Example: Mapping views to actions (This can be more complex in real scenarios)
        if view_func.__name__ == 'some_view_name':
            return 'read'
        elif view_func.__name__ == 'another_view_name':
            return 'write'
        # Add more mappings as needed
        return 'default_action'
