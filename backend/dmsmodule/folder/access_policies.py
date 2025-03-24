from rest_access_policy import AccessPolicy
from rest_framework.permissions import BasePermission

import logging
logger = logging.getLogger(__name__)

# class IsStaffOrReadOnlyPermissionRequired(BasePermission):
    
#     def has_permission(self, request, view):
#         if not request.user.is_staff:
#             self.message = "Access restricted to staff members only"
#             return False
#         return super().has_permission(request, view)
    
class StaffOnlyAccessPolicy(AccessPolicy):

    statements = [
        {
            "principal": "authenticated",
            "action": ["<method:get>"],
            "effect": "allow",
            "condition": "is_staff_user"
        },
        {
            "principal": "*",  # Only authenticated users can perform other actions
            "action": ["<method:post>", "<method:put>", "update"],     # Applies to all other actions
            "effect": "deny"   # Deny by default for non-staff users
        }
    ]

    def is_staff_user(self, request, view, action):
        """
        Condition to check if the user is authenticated and is a staff member.
        """
        print(f"Action is: {action}")
        if request.user.is_authenticated and request.user.is_staff:
            return True
        return False
    


class FolderViewAccessPolicy(AccessPolicy):
    statements = [
       {
            "principal": ["*", ],
            "action": ["<method:get>"],
            "effect": "deny",
            "message": "Access restricted: only directors can perform this action."
        }
    ]
    #     {
    #         "principal": "authenticated",  # Authenticated users can POST
    #         "action": ["<method:post>"],
    #         "effect": "allow"
    #     },
    #     {
    #         "principal": "*",  # Applies to all users (including unauthenticated)
    #         "action": ["<method:put>", "<method:patch>", "<method:delete>, <method:get>"],
    #         "effect": "deny",
    #         "message": "Access restricted: you need director-level permissions to perform this action."
    #     }
    # ]

    # def is_record_group_member(self, request, view, action):
    #     """
    #     Condition to check if the user is in the 'directors' group.
    #     """
    #     return (
    #         request.user.is_authenticated
    #         and hasattr(request.user, 'group')
    #         and request.user.group.group_name == "directors"
    #     )

    # def get_user_message(self, request, view, action, effect, condition):
    #     """
    #     Customize the message shown when access is denied.
    #     """
    #     if effect == "deny":
    #         if action in ["<method:put>", "<method:patch>", "<method:delete>"]:
    #             return "Access restricted: you need director-level permissions to perform this action."
    #     return super().get_user_message(request, view, action, effect, condition)


  