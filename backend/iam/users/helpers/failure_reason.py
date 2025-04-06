from typing import Union
from rest_framework.request import Request
from iam.models import UserAccountsModel
from .access_log import access_failure_log_record

class AuthFailureReason:
    MISSING_USERNAME = "missing_username"
    USER_NOT_FOUND = "user_not_found"
    USER_INACTIVE = "user_inactive"
    INVALID_CREDENTIALS = "invalid_credentials"

def serialize_user(user: UserAccountsModel) -> dict:
    if not user:
        return {}

    return {
        "user_id": str(user.user_account_id),
        "username": user.username,
        "email": user.email,
        "is_active": user.is_active,
        "is_superuser": user.is_superuser,
        # "roles": list(user.groups.values_list("name", flat=True)),
        # add other custom fields from your model if needed
    }

def failure_reason(request: Request) -> None:
    """
    Determines the reason for a failed login and logs it using access_failure_log_record.
    """
    username: str = request.data.get("username", "")
    user_obj: Union[UserAccountsModel, str, None] = None
    failure_reason: str = ""
    is_super_user: bool = False
    user_data: dict = {}  # Initialize user_data here

    if not username:
        failure_reason = AuthFailureReason.MISSING_USERNAME
    else:
        user_obj = UserAccountsModel.objects.filter(username=username).first()
        if user_obj:
            user_data = serialize_user(user_obj)
            print(user_data)
            is_super_user = user_obj.is_superuser

            if not user_obj.is_active:
                failure_reason = AuthFailureReason.USER_INACTIVE
            else:
                failure_reason = AuthFailureReason.INVALID_CREDENTIALS
            is_super_user = user_obj.is_superuser
        else:
            failure_reason = AuthFailureReason.USER_NOT_FOUND

    access_failure_log_record(
        request=request,
        user_obj=user_data,
        is_super_user=is_super_user,
        failure_reason=failure_reason,
    )