from django.dispatch import receiver
from django.db.models.signals import post_save
from ..models.delegaiton_model import DelegationModel
from notification.models.core_notification_model import NotificationModel
from notification.models.notification_preference_model import NotificationPreferenceModel
from notification.models.notification_event_type import NotificationEventTypeModel
from notification.tasks import send_in_app_notification
from utils.custom_exception_handler import CustomExceptionForError
from rest_framework.response import Response

# @receiver(post_save, sender=DelegationModel)
# def delegation_notification(sender, instance, created, **kwargs):
#     if created:
#         send_notification.delay(
#             notification_recepient_id=instance.delegatee_user.user_account_id,  # Ensure this is the ID
#             notification_message=f"You have received a delegation request from '{instance.delegator.first_name} {instance.delegator.last_name} for some days.",
#             notification_type="In_app",
#             notification_metadata={'Delegation': str(instance.delegation_id)},
#             notification_sender=f"{instance.delegator.first_name} {instance.delegator.last_name}"
#         )

from celery.utils.log import get_task_logger
logger = get_task_logger(__name__)

@receiver(post_save, sender=DelegationModel)
def handle_delegation_notification(sender, instance, created, **kwargs):
    if created:
        try:
            # Call your delegation_notification function here
            response = delegation_notification(sender, instance, created)
            if isinstance(response, Response):
                return response
        except CustomExceptionForError as exc:
            return Response({
                "message": exc.message,
                "error_tyoe": exc.error_type
            }, status=500)
        

def delegation_notification(sender, instance, created, **kwargs):
    if created:
        try:
            # Fetch the delegation notification template
            delegation_template = NotificationEventTypeModel.objects.get(eventType_name="delegation_request")
            # Check user preferences for notifications
            user_pref = NotificationPreferenceModel.objects.filter(
                user=instance.delegatee_user,
                template=delegation_template,
                enabled=True
            ).first()

            if not user_pref:
                raise CustomExceptionForError(
                    message="User preference is not properly set.",
                    error_type="PREFERENCE_NOT_FOUND"
                )

            # Prepare context for the notification template
            context = f"{instance.delegator.first_name} {instance.delegator.last_name}"
            # Trigger asynchronous notification task

            if user_pref.preffered_channel == "in_app":
                send_in_app_notification.delay(
                    sender_id=instance.delegator.user_account_id,
                    recipient_id=instance.delegatee_user.user_account_id,
                    template_id=delegation_template.eventType_id,
                    notification_message=f"You have been assigned a critical delegation task by {context}.",
                    # notification_message = None,
                    context=context,
                )
                logger.info("Delegation notification sent successfully.")

        except NotificationEventTypeModel.DoesNotExist:
            logger.error("Delegation notification template not found.")
        except CustomExceptionForError as exc:
            logger.warning(f"Custom exception: {exc.message} (Type: {exc.error_type})")
        except Exception as e:
            logger.error(f"Unexpected error in delegation notification: {str(e)}")
