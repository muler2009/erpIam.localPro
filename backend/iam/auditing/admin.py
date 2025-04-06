from django.contrib import admin
from .models.custom_access_log_failure import AccessFailureLogModel
# Register your models here.


class AccessFailureLogModelAdmin(admin.ModelAdmin):
    # Customize the list display to show specific fields
    list_display = ("user_agent", "attempt_time", "ip_address", "username", "failure_count", 'failure_reason' )


admin.site.register(AccessFailureLogModel, AccessFailureLogModelAdmin)