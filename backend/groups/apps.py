from django.apps import AppConfig


class GroupsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'groups'
    label = 'groups'

    def ready(self):
        import ldap_integration.signals.group_signals
        import groups.signals