from django.contrib import admin
from .models.custom_access_log_failure import AccessFailureLogModel
from .models.session_tracking_model import SessionTrackerModel
from .models.session_activity import SessionActivityModel
# Register your models here.


class AccessFailureLogModelAdmin(admin.ModelAdmin):
    # Customize the list display to show specific fields
    list_display = ("user_agent", "attempt_time", "ip_address", "username", "failure_count", 'failure_reason' )

class SessionTrackerModelAdmin(admin.ModelAdmin):
    # Customize the list display to show specific fields
    list_display = ("session_id", "user", "start_time", "end_time", "ip_address", 'status' )

class SessionActivityModelAdmin(admin.ModelAdmin):
    # Customize the list display to show specific fields
    list_display = ("session", "activity_started_at", "activity_type", "endpoint", 'status_code', "metadata" )



admin.site.register(AccessFailureLogModel, AccessFailureLogModelAdmin)
admin.site.register(SessionTrackerModel, SessionTrackerModelAdmin)
admin.site.register(SessionActivityModel, SessionActivityModelAdmin)
