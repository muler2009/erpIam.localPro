from rest_access_policy import AccessPolicy

# deny access to resources for unauthehicated users 
class DenyAccessForUnauthenticated(AccessPolicy):
    statements =[
        {
            "principal": ["anonymous"],
            "action": ["*"],  # deny all actions if authenticated
            "effect": "deny",
        },
    ]


# allow only view for unauthehicated users 
class AllowAnyUsersToLoginAccessPolicy(AccessPolicy):
    message="Please login to continue";
    status_code = 403
    
    statements = [
        {
            "principal": ["anonymous"],
            "action": ["<method:post>", "<method:get>"],  # Allow all actions if authenticated
            "effect": "allow",
        },
    ]

class IsAuthenticatedAccessPolicy(AccessPolicy):
    message="You Must login first"
    statements = [
        {
            "principal": ["authenticated"],
            "action": ["<method:post>"],  # Allow all actions if authenticated
            "effect": "allow",
        },
    ]


class IsAuthenticatedAdminUser(AccessPolicy):
    message = "Sorry!, You should have an admin privilged to access the resource!"
    statements = [
        {
            "principal": "authenticated",
            "action": "*",
            "effect": "allow",
            "condition":["is_admin_group"],
        },
    ]

    def is_admin_group(self, request, view, action) -> bool:
        group = getattr(request.user, 'group', None)
        if group and group.group_name in ['admin',]:
            return True
        return False
    

class IsAuthenticatedUserOnly(AccessPolicy):
    message = "You must be authenticated to login."
    statements = [
        {
            "principal": "authenticated",
            "action": ["*"],  # Allow all actions if authenticated
            "effect": "allow",
        },
        {
            "principal": "*",  # Deny everyone else
            "action": ["*"],
            "effect": "deny",
        },
    ]