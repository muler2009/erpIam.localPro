import ldap
from django.conf import settings
from django.dispatch import receiver
from rest_framework.response import Response
from django.db.models.signals import post_save, pre_save, post_delete, m2m_changed
from users.models import UserAccountsModel
from django.contrib.auth import get_user_model
from groups.models import PosixGroupUserModel
import logging
import argon2
from ldap import modlist

logger = logging.getLogger(__name__)

@receiver(m2m_changed, sender=PosixGroupUserModel.members.through)
def update_user_group(sender, instance, action, reverse, model, pk_set, **kwargs):
    if action == "post_add":
        for user_id in pk_set:
            user = UserAccountsModel.objects.get(pk=user_id)
            if user.group is None:
                user.group = instance
                user.save()


@receiver(post_save, sender=UserAccountsModel)
def user_post_save_handler(sender, instance, created, *args, **kwargs):
    ldap_uri = settings.LDAP_URI
    ldap_bind_dn = settings.LDAP_BIND_DN
    ldap_bind_password = settings.LDAP_PASSWORD

    connection = ldap.initialize(ldap_uri)
    connection.bind(ldap_bind_dn, ldap_bind_password)
    
    if created:
        print(f"Instance created with plain password: {instance._plain_password}")
        search_filter = '(uidNumber=*)'
        search_attrs = ['uidNumber']

        try:              
            result = connection.search_s('ou=users,ou=iam,dc=erpIam,dc=local', ldap.SCOPE_SUBTREE, search_filter, search_attrs)
            uid_numbers = [int(entry['uidNumber'][0].decode('utf-8')) for dn, entry in result if 'uidNumber' in entry]
            next_uid_number = max(uid_numbers) + 1 if uid_numbers else 1001

            gid_number = None
            if instance.group:
                try:
                    group = PosixGroupUserModel.objects.get(group_name=instance.group)
                    gid_number = group.group_posix_Id
                except PosixGroupUserModel.DoesNotExist:
                    pass
            else:
                try:
                    group = PosixGroupUserModel.objects.get(group_name="active")
                    gid_number = group.group_posix_Id
                except PosixGroupUserModel.DoesNotExist:
                    pass

            # gid_number = group.group_posix_Id if group else None
            gid_number = str(gid_number) if isinstance(gid_number, int) else 0
            ph = argon2.PasswordHasher()
            hashed_password = ph.hash(instance._plain_password) if instance._plain_password else None  
            # hashed_password = argon2.PasswordHasher(instance._plain_password) if instance._plain_password else None  # Use the temporary plain password

            if not hashed_password:
                raise ValueError("Plain password is not set for the instance.")
            
            # print(f"password: {instance.password}")

            hashed_password = argon2.PasswordHasher().hash(instance.password.encode('utf-8'))

            user_dn = f"uid={instance.username},ou=users,ou=iam,dc=erpIam,dc=local"  
            attrs = {
                'objectClass': [b'top', b'person', b'organizationalPerson', b'inetOrgPerson', b'posixAccount'],
                'uid': [instance.username.encode('utf-8')],
                'sn': [instance.first_name.encode('utf-8')],
                'cn': [f'{instance.first_name} {instance.last_name}'.encode('utf-8')],
                'mail': [instance.email.encode('utf-8')],
                'userPassword': [instance._plain_password.encode('utf-8')],
                'gidNumber': [str(gid_number).encode('utf-8')],
                'uidNumber': [str(next_uid_number).encode('utf-8')],
                'homeDirectory': [instance.home_directory.encode('utf-8')] if instance.home_directory else [b'/home/directory'],
            }

            connection.add_s(user_dn, modlist.addModlist(attrs))

        except ldap.LDAPError as e:
            raise ValueError(f'Failed to create user in LDAP: {str(e)}')

        finally:
            connection.unbind()


# @receiver(pre_save, sender=UserAccountsModel)
def update_pre_save_handler(sender, instance, raw, **kwargs):
    ldap_uri = settings.LDAP_URI
    ldap_bind_dn = settings.LDAP_BIND_DN    
    ldap_bind_password = settings.LDAP_PASSWORD

    try:
        # Check if the instance exists in the database
        existing_instance = UserAccountsModel.objects.get(user_account_id=instance.user_account_id)
    except UserAccountsModel.DoesNotExist:
        # If the instance does not exist, this is a creation event, not an update
        print(f"User with user_id {instance.user_account_id} does not exist in the database, skipping LDAP update.")
        return
    
    gid_number = None
    try:
        connection =ldap.initialize(ldap_uri)
        connection.simple_bind(ldap_bind_dn, ldap_bind_password)   

        if instance.group:
            try:
                group = PosixGroupUserModel.objects.get(group_name=instance.group)
                gid_number = group.group_posix_Id
            except PosixGroupUserModel.DoesNotExist:
                pass

        # gid_number = group.group_posix_Id if group else None
        gid_number = str(gid_number) if isinstance(gid_number, int) else 1002

        base_dn = "ou=users,ou=iam,dc=erpIam,dc=local"
        search_filter = f"(uid={existing_instance.username})"
        # Print debugging information
        print(f"Searching LDAP with base DN: {base_dn} and filter: {search_filter}")

        # Search for the user in LDAP
        result = connection.search_s(base_dn, ldap.SCOPE_SUBTREE, search_filter)
        print(f"Search result: {result}")

        if not result:
            print(f"User {instance.username} not found in LDAP")
            return

        user_dn = result[0][0]
        print(f"Found user DN: {user_dn}")
        
        modify_user_attr = [
            (ldap.MOD_REPLACE, "uid", [instance.username.encode('utf-8')]),
            (ldap.MOD_REPLACE, "sn",  [instance.first_name.encode('utf-8')]),
            (ldap.MOD_REPLACE, "cn",  [f'{instance.first_name} {instance.last_name}'.encode('utf-8')]),
            (ldap.MOD_REPLACE, "mail", [instance.email.encode('utf-8')]),
            (ldap.MOD_REPLACE, "userPassword", [instance.password.encode('utf-8')]),
            (ldap.MOD_REPLACE, "gidNumber", [instance.gid_number.encode('utf-8')]),
            (ldap.MOD_REPLACE, "uidNumber", [str(instance.userId).encode('utf-8')]),
            (ldap.MOD_REPLACE, "homeDirectory", [instance.home_directory.encode('utf-8')] if instance.home_directory else [b'/home/directory']),
        ]
        
        connection.modify_s(user_dn, modify_user_attr)

        if instance.password:
            connection.passwd_s(user_dn, None, instance.password)
            print(f"Password for user {instance.password} updated successfully in LDAP")    
    except ldap.LDAPError as exc:
        print(f"Error: {exc}")



    
def delete_form_ldap(username):
    ldap_uri = settings.LDAP_URI
    ldap_bind_dn = settings.LDAP_BIND_DN    
    ldap_bind_password = settings.LDAP_PASSWORD

    try:
        connection = ldap.initialize(ldap_uri)
        connection.simple_bind_s(ldap_bind_dn, ldap_bind_password)

        user_dn = f"uid={username},ou=users,ou=iam,dc=erpIam,dc=local"
        connection.delete_s(user_dn)

        connection.unbind_s()
    except ldap.LDAPError as e:
        print(f"Error deleting user from LDAP: {e}")
    

# Signal handling the deleting account 
@receiver(post_delete, sender=UserAccountsModel)
def user_post_delete_handler(sender, instance, *args, **kwargs):
    try:
        delete_form_ldap(instance.username)
        print(instance.username)
    except ldap.LDAPError as exc:
        print(f"ERROR: {exc}")

