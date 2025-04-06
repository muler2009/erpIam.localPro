from django.contrib.auth.base_user import BaseUserManager
from rest_framework import status
from rest_framework.response import Response
import ldap
from utils.connection import LDAPConnection
from django.contrib.auth import get_user_model
from django.conf import settings
from config.settings import auth_server
from utils.set_default_password import set_default_password

# UserAccountsModel = get_user_model()
class UserAccountsManager(BaseUserManager):
    def create_user_in_ldap(self, username, first_name, last_name, email, password):
        ldap_uri = auth_server.AUTH_LDAP_SERVER_URI
        ldap_bind_dn = auth_server.AUTH_LDAP_BIND_DN
        ldap_bind_password = auth_server.AUTH_LDAP_BIND_PASSWORD

        user_dn = f'cn={username},ou=admin,dc=erpIam,dc=local'
        user_attrs = [
            ('objectClass', [b'inetOrgPerson', b'organizationalPerson', b'person', b'top']),
            ('cn', [username.encode('utf-8')]),
            ('sn', [last_name.encode('utf-8')]),
            ('givenName', [first_name.encode('utf-8')]),
            ('mail', [email.encode('utf-8')]),
            ('userPassword', [password.encode('utf-8')]),
        ]

        try:
            connection = ldap.initialize(ldap_uri)
            connection.bind(ldap_bind_dn, ldap_bind_password)
            connection.add_s(user_dn, user_attrs)
        except ldap.LDAPError as e:
            raise ValueError(f'Failed to create user in LDAP: {str(e)}')
        finally:
            connection.unbind()

        return user_dn
    
    def create_user(self, username, first_name, last_name, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email must be provided before proceeding")
        email = self.normalize_email(email)
        email = email.lower()
        user_instance = self.model(
            email=email, 
            username=username, 
            first_name=first_name, 
            last_name=last_name, 
            **extra_fields
        )
        # Setting the user password
        if password:
            user_instance.set_password(password)
        else:
            user_instance.set_password(set_default_password())
            
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_superuser', False)
        user_instance.save(using=self._db)

        return user_instance
    
    def create_superuser(self, email, username, first_name, last_name, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must set the staff.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have superuser=True.')

        # user_dn = self.create_user_in_ldap(username, first_name, last_name, email, password)
        user = self.create_user(username, first_name, last_name, email, password, **extra_fields)
        # , user_dn
        return user