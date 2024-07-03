from typing import Any
import ldap
from ldap import LDAPError
from ..directoryService.connection import LDAPConnection


class LDAPMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.connection = None
        
    def __call__(self, request, *args: Any, **kwds: Any):
        self.connection = LDAPConnection(
            ldap_uri="ldap://localhost:389",
            bind_dn = 'cn=admin,dc=erpIam,dc=local',
            bind_password='password'
        )
        
        try:
            request.connection = self.connection
            response =self.get_response(request)
            
        except LDAPError as exc:
            raise LDAPError
        
        finally:
            if self.connection:
                self.connection.close_ldap_server()
        
        return response