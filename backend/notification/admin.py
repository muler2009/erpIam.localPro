from django.contrib import admin
from .models.core_notification_model import NotificationModel
from .models.notification_template import NotificationTemplateModel
from .models.notification_preference_model import NotificationPreferenceModel
# Register your models here.

admin.site.register(NotificationModel)
admin.site.register(NotificationTemplateModel)
admin.site.register(NotificationPreferenceModel)
