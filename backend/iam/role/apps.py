from django.apps import AppConfig


class RoleConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'iam.role'
    label = 'iam_role'
