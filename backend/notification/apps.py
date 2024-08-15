from django.apps import AppConfig


class NotificationConfig(AppConfig):
    default_auto_field = 'django.db.models.UUIDField'
    name = 'notification'
    label = 'notification'

    def ready(self) -> None:
        import notification.signals.send_notification