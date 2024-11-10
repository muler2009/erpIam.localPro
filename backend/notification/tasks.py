# notifications/tasks.py
from celery import shared_task
from rest_framework.response import Response
from .models.core_notification_model import NotificationModel
from .models.notification_template import NotificationTemplateModel
from iam.models import UserAccountsModel
import logging

logger = logging.getLogger(__name__)

from django.db import transaction

@shared_task
def send_notification(notification_recepient_id, notification_sender, notification_message, notification_type, notification_metadata=None):
    try:
        with transaction.atomic():  # Ensure that notifications are saved
            notification_recepient = UserAccountsModel.objects.get(user_account_id=notification_recepient_id)
            notification = NotificationModel.objects.create(
                notification_recepient=notification_recepient,
                notification_message=notification_message,
                notification_type=notification_type,
                notification_metadata=notification_metadata or {},
                notification_sender=notification_sender
                
            )
            logger.info(f"Notification created with ID: {notification.notification_id}")
            return notification.notification_id
    except UserAccountsModel.DoesNotExist:
        logger.error(f"User with account ID {notification_recepient_id} does not exist.")
    except Exception as e:
        logger.error(f"An error occurred while sending notification: {e}")


@shared_task
def send_in_app_notification(user_account_id, template_id, context):
    user = UserAccountsModel.objects.get(user_account_id=user_account_id)
    template = NotificationTemplateModel.objects.objects.get(template_id=template_id)
    NotificationModel.objects.create(
        notification_recepient=user,
        notification_template = template,
        notification_message=context,
       
    )