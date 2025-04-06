from config.env import env
import ldap
from django_auth_ldap.config import LDAPSearch, LDAPSearchUnion, LDAPGroupQuery, PosixGroupType

# app use LDAP for authenticating users by default
AUTH_LDAP_SERVER_URI = env('LDAP_URI')
AUTH_LDAP_BIND_DN = env('LDAP_BIND_DN')
AUTH_LDAP_BIND_PASSWORD = env('LDAP_PASSWORD')


# LDAP user search configuration
AUTH_LDAP_USER_SEARCH = LDAPSearchUnion(
    LDAPSearch("ou=admin,ou=erpIam,dc=local", ldap.SCOPE_SUBTREE, "(cn=%(user)s)"),
    LDAPSearch("ou=users,ou=iam,dc=erpIam,dc=local",ldap.SCOPE_SUBTREE, "(uid=%(user)s)"),
)

# AUTH_LDAP_USER_DN_TEMPLATE = "cn=%(user)s,ou=users,ou=iam,dc=erpIam,dc=local"

# Defining the LDAP search for posixGroup
AUTH_LDAP_GROUP_SEARCH = LDAPSearch(
    "ou=groups,ou=iam,dc=erpIam,dc=local",  # Base DN for group search
    ldap.SCOPE_SUBTREE,             # Search the entire subtree
    "(objectClass=posixGroup)"      # Filter for posixGroup object class
)

AUTH_LDAP_ALWAYS_UPDATE_USER = False 
# Set the group type to PosixGroupType
AUTH_LDAP_GROUP_TYPE = PosixGroupType()

AUTH_LDAP_REQUIRE_GROUP = (
    LDAPGroupQuery("cn=client,ou=groups,ou=iam,dc=erpIam,dc=local")
    | LDAPGroupQuery("cn=admin,ou=groups,ou=iam,dc=erpIam,dc=local") 
    | LDAPGroupQuery("cn=directors,ou=groups,ou=iam,dc=erpIam,dc=local")
) & ~LDAPGroupQuery("cn=disabled,ou=groups,ou=groups,ou=iam,dc=erpIam,dc=local") 

# LDAP attribute mappings

AUTH_LDAP_USER_ATTR_MAP = {
    'username': 'uid',  # Replace with your LDAP username attribute
    'first_name': 'givenName',  # Replace with your LDAP first name attribute
    'last_name': 'sn',  # Replace with your LDAP last name attribute
    'email': 'mail',  # Replace with your LDAP email attribute
    'password': 'userPassword'
}

AUTH_LDAP_USER_FLAGS_BY_GROUP = {
    "active": "cn=active,ou=groups,dc=erpIam,dc=local",
    # "is_staff": (LDAPGroupQuery("cn=staff,ou=groups,dc=erpIam,dc=local") | LDAPGroupQuery("cn=admin,ou=groups,dc=erpIam,dc=local")),
    # "is_superuser": "cn=superuser,ou=groups,dc=erpIam,dc=local",
}
