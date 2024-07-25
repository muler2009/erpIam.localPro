from django.apps import AppConfig


class GroupsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'iam.groups'
    label = 'iam_groups'

    def ready(self):
        import iam.ldap_integration.signals.group_signals
        import iam.groups.signals