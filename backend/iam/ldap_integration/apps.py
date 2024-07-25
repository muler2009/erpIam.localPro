from django.apps import AppConfig


class LdapIntegrationConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'iam.ldap_integration'
    label = 'iam_ldap_integration'
