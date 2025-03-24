from rest_access_policy import AccessPolicy
 
class GetGroupAccessPolicy(AccessPolicy):
    message = "Muleta not allowd"
    statements = [
        {
            "action": ["<method:get>"],
            "principal": ["groups:admin"],
            "effect": "deny",
            "message": "Access denied "
        }
    ]