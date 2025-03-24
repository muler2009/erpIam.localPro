from django.apps import AppConfig


class WorkflowConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'workflow_service'
    label = 'workflow_service'

    def ready(self):
        import workflow_service.signals.update_template_entrycriteria_signals