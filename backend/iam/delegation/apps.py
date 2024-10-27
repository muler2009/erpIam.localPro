from django.apps import AppConfig


class DelegationConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'iam.delegation'
    label = 'iam_delegation'
