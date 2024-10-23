from rest_framework import permissions
from iam.policy.models.policy_mocel_modified import OromiaLandPolicy

class EnforcePolicyPermisson(permissions.BasePermission):
    message = "Allwoed for only for authorized users"
    def has_permission(self, request, view):
        user = request.user
        if not user.is_authenticated or not request.method in permissions.SAFE_METHODS:
            return False
        return super().has_permission(request, view)
    
    def has_object_permission(self, request, view, obj):
        # Check if the user is a superuser
        if not request.user.is_superuser:
            return False
        # If the user is a superuser, allow the object access
        return super().has_object_permission(request, view, obj)



class PolicyPermission(permissions.BasePermission):
    message = "message from policy permission, You are not Authorized"
    
    def has_permission(self, request, view):
        user = request.user
        role_policies = []

        if user.is_superuser:
            return True
        
        # Get all policies assigned to user's roles
        if user.is_authenticated:
            for role in user.roles.all():
                policies = OromiaLandPolicy.objects.filter(roles__users=user)
                role_policies.extend(policies)
                
        # Check if the current action is allowed by any policy
        for policy in role_policies:
            for statement in policy.statements:
                # Match the action (view name) and resource
                if statement['effect'] == 'allow':
                    if view.__class__.__name__ in statement['action']:
                        # # Check if the resource matches (this is up to you, example for demo)
                        # if request.resolver_match.view_name in statement['resource']:
                        return True
        
        # Deny by default
        return False