from django.apps import AppConfig


class UserProfileConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'iam.user_profile'
    label = 'iam_user_profile'

    def ready(self):
        import iam.user_profile.signals
