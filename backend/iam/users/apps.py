from django.apps import AppConfig


class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'iam.users'
    label = 'iam_users'
    models_module = 'users.models'

    def ready(self):
        import iam.ldap_integration.signals.user_signals
        import iam.users.signals.user_locked_out_signal