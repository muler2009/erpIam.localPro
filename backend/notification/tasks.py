# notifications/tasks.py
from celery import shared_task
from rest_framework.response import Response
from .models.core_notification_model import NotificationModel
from .models.notification_event_type import NotificationEventTypeModel
from iam.models import UserAccountsModel
import logging

logger = logging.getLogger(__name__)

from django.db import transaction

from celery.utils.log import get_task_logger
logger = get_task_logger(__name__)

@shared_task
def send_in_app_notification(sender_id, recipient_id, template_id, context, notification_message):
    try:
        recipient = UserAccountsModel.objects.get(user_account_id=recipient_id)
        sender = UserAccountsModel.objects.get(user_account_id=sender_id)
        template = NotificationEventTypeModel.objects.get(eventType_id=template_id)

        # Use custom message or format the template's default message
        context = "This is a string, not a dictionary."
        

        formatted_message = notification_message if notification_message else template.default_message.format(context)
        
        # Create and save the notification
        notification = NotificationModel.objects.create(
            notification_sender=sender,
            notification_recepient=recipient,
            notification_template=template,
            notification_message=formatted_message,
            notification_metadata={"message": formatted_message},
        )

        logger.info(f"Notification created successfully: {notification.notification_id}")
        return str(notification.notification_id)

    except KeyError as key_error:
        logger.error(f"Context key missing for template: {key_error}")
        raise ValueError(f"Missing key in context: {key_error}")

    except (UserAccountsModel.DoesNotExist, NotificationEventTypeModel.DoesNotExist) as e:
        logger.error(f"Error in notification task: {str(e)}")
        raise

    except Exception as e:
        logger.error(f"Unexpected error in notification task: {str(e)}")
        raise

