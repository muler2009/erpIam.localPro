# services.py
from .models.notification_event_type import NotificationTemplateModel
from .models.notification_preference_model import NotificationPreferenceModel
from .tasks import (
 
    send_in_app_notification,
)

def send_notification(user_account_id, template_name, context):
    try:
        template = NotificationTemplateModel.objects.get(template_name=template_name)
        
        # Check if the user has enabled notifications for this channel
        user_pref = NotificationPreferenceModel.objects.filter(user=user_account_id, preffered_channel=template.template_channel, enabled=True).exists()
        if not user_pref:
            return

        # Dispatch the notification based on the channel
        # if template.channel == 'email':
        #     send_email_notification.delay(user.id, template.id, context)
        # elif template.channel == 'sms':
        #     send_sms_notification.delay(user.id, template.id, context)
        # elif template.channel == 'push':
        #     send_push_notification.delay(user.id, template.id, context)
        if template.template_channel == 'in_app':
            send_in_app_notification.delay(user_account_id, template.template_id, context)

    except NotificationTemplateModel.DoesNotExist:
        print(f"Notification template '{template_name}' not found.")