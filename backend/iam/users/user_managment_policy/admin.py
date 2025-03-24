from rest_access_policy import AccessPolicy

class IsAuthenticatedAdminUser(AccessPolicy):
    message = "You should have and admin privilged to see"
    statements = [
        {
            "principal": "authenticated",
            "action": "*",
            "effect": "allow",
            "condition": "is_admin_group",
        },
    ]

    def is_admin_group(self, request, view, action) -> bool:
        group = getattr(request.user, 'group', None)
        if group:
            print(f"User group: {group.group_name}")  # Debugging log
            if group.group_name in ['admin',]:
                return True
        return False


   