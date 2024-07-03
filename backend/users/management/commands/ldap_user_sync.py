from typing import Any
import ldap
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from directoryService.connection import LDAPConnection

class Command(BaseCommand):
    connection = None
    def handle(self, *args: Any, **options: Any) -> str | None:
        
        self.connection = LDAPConnection('ldap://localhost:389').connect_ldap_server()
        ldap_search_filter = "(cn={})".format(username)
        ldap_result = self.connection.search('ou=users,ou=iam,dc=erpIam,dc=local', ldap.SCOPE_SUBTREE, ldap_search_filter)
        
        User = get_user_model()
        
        for dn, attrs in ldap_result:
            username = attrs.get('cn', [''])[0]
            first_name = attrs.get('givenName', [''])[0]
            last_name = attrs.get('sn', [''])[0]
            email = attrs.get('mail', [''])[0]
            try:
                user = User.objects.get(username=username)
                user.email = email
                user.first_name = first_name
                user.last_name = last_name
                user.save()
            except User.DoesNotExist:
                User.objects.create_user(username=username, email=email)
                
        LDAPConnection('ldap://localhost:389').close_ldap_server()
        
        self.stdout.write(self.style.SUCCESS('LDAP synchronization complete!'))
                
            
                