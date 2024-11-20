from django.contrib import admin
from .models.core_notification_model import NotificationModel
from .models.notification_event_type import NotificationEventTypeModel
from .models.notification_preference_model import NotificationPreferenceModel
# Register your models here.

admin.site.register(NotificationModel)
admin.site.register(NotificationEventTypeModel)
admin.site.register(NotificationPreferenceModel)

# @admin.register(NotificationModel)
# class NotificationModelAdmin(admin.ModelAdmin):
#     list_display = ('notification_id',)