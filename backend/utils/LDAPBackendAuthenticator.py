from django_auth_ldap.backend import LDAPBackend, LDAPSearch
import ldap

class ERPBackendAuthenticator(LDAPBackend):
    def authenticate_ldap_user(self, ldap_user, password):
        user = super().authenticate_ldap_user(ldap_user, password)
        if user and self.is_member_of_posix_group(ldap_user, "cn=enabled,ou=unix-groups,ou=groups,ou=iam,dc=erpIam,dc=local"):
            return user
        return None

    def is_member_of_posix_group(self, ldap_user, group_dn):
        group_search = LDAPSearch(group_dn, ldap.SCOPE_BASE, "(objectClass=posixGroup)")
        results = group_search.execute(ldap_user.connection)

        if results and 'memberUid' in results[0][1]:
            member_uids = results[0][1]['memberUid']
            return ldap_user.attrs['uid'][0] in member_uids
        return False
