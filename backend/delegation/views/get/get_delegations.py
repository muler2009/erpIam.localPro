from .get_base_class import GetBaseDelegationRequestHandler


class GetActiveDelegationsRequestHandler(GetBaseDelegationRequestHandler):
    is_active = True  # Only active delegations
    message = "No Active Delegation Yet"


class GetExpiredDelegationsRequestHandler(GetBaseDelegationRequestHandler):
    is_active = False  # Only expired delegations
    message = "No associated History found!"



        

    