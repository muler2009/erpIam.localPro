from rest_access_policy import AccessPolicy
from iam.role.models.models import IamRoleModel
from utils.exceptions.exception_classes import CustomExceptionForError

class FolderViewAccessPolicy(AccessPolicy):
    message = "You don't have permission to access  Folder !"
    statements = [
        {
            "principal": "authenticated",
            "action": ["<method:get>"],
            "effect": "allow"
        }
    ]

    @classmethod
    def scope_queryset(cls, request, qs):
        # Only return folders where the current user is the creator
        return qs.filter(created_by= request.user)


class FolderCreateAccessPolicy(AccessPolicy):
    # message = "You don't have pwemission to create folder"
    statements = [
        {
            "principal": "authenticated",
            "action": ["<method:post>"],
            "effect": "allow",
            "condition": "create_policy",
        }
    ]

    def create_policy(self, request, view, action) -> bool:
        # referring the requesting user 
        user = request.user 
        return user.roles.filter(role_name="Manager").exists()
        # only user who has a role can only create a folder
        # return IamRoleModel.objects.filter(users=user).exists() 

    def create_policy(self, request, view, action) -> bool:
        """Custom logic to check if the user has the 'Manager' role."""
        user = request.user
        
        # Check if the user has the 'Manager' role
        if not user.roles.filter(role_name="Manager").exists():
            # If not, deny permission and provide a custom message
            raise CustomExceptionForError(message="You don't have permission to create a folder.", error_type="Permission Denied")
        
        return True  # Permission is granted if the user has the Manager role
   
  
    
    