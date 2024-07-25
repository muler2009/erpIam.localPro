from typing import Any
from django.core.management import BaseCommand
from directoryService.iam.models.userAccount import UserAccountsModel
from directoryService.iam.models.posixGroupModel import PosixGroupUserModel
from ldap import modlist
import ldap
from django.conf import settings

class Command(BaseCommand):

    def handle(self, *args, **options):
        # ldap_connection = request.ldap_connection
        ldap_uri = settings.LDAP_URI
        ldap_bind_dn = settings.LDAP_BIND_DN
        ldap_bind_password = settings.LDAP_PASSWORD

        connection = ldap.initialize(ldap_uri)
        connection.bind(ldap_bind_dn, ldap_bind_password)

        users = UserAccountsModel.objects.all()

        for user in users:
            filter_str = f"(uid={user.username})"
            result = connection.search_s('ou=users,ou=iam,dc=erpIam,dc=local', ldap.SCOPE_SUBTREE, filter_str)
            if result:
                dn = result[0][0]
                attrs = [(ldap.MOD_REPLACE, 'cn', user.get_full_name()), (ldap.MOD_REPLACE, 'mail', user.email)]
                connection.modify_s(dn, attrs)
            else:
                dn = f"uid={user.username},ou=users,ou=iam,dc=erpIam,dc=local"
                attrs = [
                    ('objectClass', [b'top', b'person', b'organizationalPerson', b'inetOrgPerson', b'posixAccount']),
                    ('uid', [user.username.encode('utf-8')]),
                    ('sn', [user.first_name.encode('utf-8')]),
                    ('cn', [f'{user.first_name} {user.last_name}'.encode('utf-8')]),
                    ('mail', [user.email.encode('utf-8')]),
                    ('userPassword', [user.password.encode('utf-8')]),    
                    ('gidNumber', [str(user.userId).encode('utf-8')]),             
                    ('uidNumber', b'1000'),
                    ('homeDirectory', [user.home_directory.encode('utf-8')] if user.home_directory else [b'/home/directory']),  
                ]
                # mod_attrs = modlist.addModlist(attrs)
                connection.add_s(dn, attrs)

        
        self.stdout.write(self.style.SUCCESS('LDAP synchronization complete!'))