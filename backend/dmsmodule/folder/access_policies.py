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
            "principal": ["group:directors", "authenticated"],
            "action": ["<method:get>"],
            "effect": "allow",
            "condition": ["is_record_goup_member"],
        },
        {
            "principal": ["authenticated" ],
            "action": ["<method:post>"],
            "effect": "allow",
        },
        {
            "principal": ["*", ],  
            "action": ["<method:put>"],
            "effect": "deny", 
            "message": "Access restricted: you need director-level permissions to perform this action."
        }
    ]
  

    @classmethod
    def scope_queryset(cls, request, qs):
        # This method filters the queryset to only include folders created by the user
        return qs.filter(created_by=request.user)

    def is_record_goup_member(self, request, view, action):
        if request.user.is_authenticated and request.user.group.group_name == "directors":
            return True
        return False




  