from iam.models import UserAccountsModel
from axes.handlers.proxy import AxesProxyHandler
from requests import request
from iam.auditing.models.session_tracking_model import SessionTrackerModel

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

    # test = AxesProxyHandler.is_locked(request, credentials={'username': "sysadmin"})

    u = UserAccountsModel.objects.get(username="recordofficer")
    s= SessionTrackerModel.objects.filter(user=u).values("session_id", "status", "end_time")
    

    print(s)
    