from django.apps import AppConfig

class AuditingConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'iam.auditing'
    label = 'iam_auditing'

    def ready(self):
        from .audit_signals import session_signal
        from .audit_signals.session_tracker_signal_handler import user_logged_in_session_tracker
        from .audit_signals.session_logut_handler import user_logged_out_session

