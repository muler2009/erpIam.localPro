from django_auth_ldap.backend import LDAPBackend
# from axes.handlers import watch_login
from axes.signals import user_login_failed, user_logged_in
from axes.handlers.base import AxesHandler

"""
    Custom Authentication backend because the axes built on the top 
    the default django authentocation system so to use the LDAP as primary authentication 
"""

class LDAPWithAxesBackend(LDAPBackend):
    def __init__(self):
        super().__init__()

    # overriding the ldap authentication method taking the request, username and password
    def authenticate(self, request, username=None, password=None, **kwargs):
        AUTHENTICATED_USER = super().authenticate(request=request, username=username, password=password, **kwargs)
        if not AUTHENTICATED_USER:
            credentials = {
                'username': username,
                'password': password
            }
            # user_login_failed method a signal to track failed login
            user_login_failed.send(sender=self.__class__, request=request, credentials=credentials)
        return AUTHENTICATED_USER