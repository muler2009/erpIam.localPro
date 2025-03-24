from rest_access_policy import AccessPolicy

class AllowAnyUsers(AccessPolicy):
    statements = [
        {
            "principal": ["anonymous"],
            "action": ["*"],  # Allow all actions if authenticated
            "effect": "allow",
        },
    ]

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