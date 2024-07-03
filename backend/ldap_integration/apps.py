from django.apps import AppConfig


class LdapIntegrationConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'ldap_integration'

    # def ready(self):
    #     import ldap_integration.signals.group_signals
    #     import backend.ldap_integration.signals.user_signals
        
