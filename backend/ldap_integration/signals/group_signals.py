import ldap
from django.conf import settings
from django.dispatch import receiver
from rest_framework.response import Response
from django.db.models.signals import post_save, pre_save, post_delete
from users.models import UserAccountsModel
from django.contrib.auth import get_user_model
from groups.models import PosixGroupUserModel
from django.contrib.auth.models import Group

@receiver(post_save, sender=PosixGroupUserModel)
def create_group_in_ldap_server(sender, instance, created, *args, **kwargs):
    ldap_uri = settings.LDAP_URI
    ldap_bind_dn = settings.LDAP_BIND_DN
    ldap_bind_password = settings.LDAP_PASSWORD

    if created:
        group_dn = f"cn={instance.group_name},ou=groups,ou=iam,dc=erpIam,dc=local"

        # member_uids = [user.username for user in instance.members.all()]

        # converts the usernames to bytes by encoding them with the UTF-8 encoding
        # member_uids_bytes = [uid.encode('utf-8') for uid in member_uids]

        group_attrs = [
            ('objectClass', [b'posixGroup', b'top']),
            ('cn', [instance.group_name.encode('utf-8')]),
            ('gidnumber', [str(instance.group_posix_Id).encode('utf-8')]),
            ('description', [instance.group_description.encode('utf-8')]),
            # ('memberUid', [instance.member_uids_bytes])

        ]

        # if member_uids_bytes:
        # group_attrs.append(('memberUid', member_uids_bytes)) if member_uids_bytes else group_attrs.append(('memberUid', b''))
        try:
            connection = ldap.initialize(ldap_uri)
            connection.bind(ldap_bind_dn, ldap_bind_password)
            connection.add_s(group_dn, group_attrs)

        except ldap.LDAPError as e:
            raise ValueError(f'Failed to create group in LDAP: {str(e)}')

        finally:
            connection.unbind()

        return group_dn
        
@receiver(post_save, sender=UserAccountsModel)
def add_user_to_ldap_group(sender, instance, created, **kwargs):
    if created:
        ldap_uri = settings.LDAP_URI
        ldap_bind_dn = settings.LDAP_BIND_DN
        ldap_bind_password = settings.LDAP_PASSWORD

        try:
            connection = ldap.initialize(ldap_uri)
            connection.bind(ldap_bind_dn, ldap_bind_password)
            
            member_uid = instance.username.encode('utf-8')  # Assuming username is the attribute to be used as memberUid

            if instance.group:
                group_dn = f"cn={instance.group.group_name},ou=groups,ou=iam,dc=erpIam,dc=local"
                mod_attrs = [
                    (ldap.MOD_ADD, 'memberUid', [member_uid]),
  
                ]
                connection.modify_s(group_dn, mod_attrs)
            else:
                group_dn = f"cn=active,ou=groups,ou=iam,dc=erpIam,dc=local"
                
                mod_attrs = [(ldap.MOD_ADD, 'memberUid', [member_uid])]
                connection.modify_s(group_dn, mod_attrs)    


        except ldap.LDAPError as e:
            raise ValueError(f'Failed to add user to LDAP group: {str(e)}')

        finally:
            connection.unbind()
        