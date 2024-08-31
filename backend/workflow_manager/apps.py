from django.apps import AppConfig


class WorkflowManagerConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'workflow_manager'
    label = 'workflow_manager'

    def ready(self) -> None:
       import workflow_manager.signals.send_notification
