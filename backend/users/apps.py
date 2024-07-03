from django.apps import AppConfig


class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'users'
    label = 'users'
    models_module = 'users.models'

    def ready(self):
        import ldap_integration.signals.user_signals
        
