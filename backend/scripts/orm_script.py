from iam.models import UserAccountsModel
from iam.role.models.models import IamRoleModel
from axes.models import AccessFailureLog
from django.db.models import Count

def run():
   
    # user_group = UserAccountsModel.objects.prefetch_related('group').values('group__group_name')
    # roles = IamRoleModel.objects.prefetch_related("users")  # Prefetch users to optimize queries
    # print(user_group)
    # for role in roles:
    #     for user in role.users.all():  # Iterate over related users
    #         print(user.username)  # Access username correctly

    # u = AccessFailureLog.objects.filter(username="division_head").aggregate(Count('locked_out'))
    # value = AccessFailureLog.objects.aggregate(Count('locked_out'))
    # print(u)


    def serialize_user(user: UserAccountsModel) -> dict:
        if not user:
            return {}

        return {
            # "user_id": str(user.user_account_id),
            "username": user.username,
            "email": user.email,
            "is_active": user.is_active,
            "is_superuser": user.is_superuser,
            # "roles": list(user.groups.values_list("role_name", flat=True)),
            # add other custom fields from your model if needed
        }
    
    user_obj = UserAccountsModel.objects.filter(username="sysadmin").first()
    serialize_user(user=user_obj)
    
    print(user_obj)
    