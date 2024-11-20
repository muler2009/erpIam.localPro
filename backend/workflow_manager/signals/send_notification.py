from django.db.models.signals import post_save
from django.dispatch import receiver
from workflow_manager.models.request_model import RequestModel, ApprovedRequestByRequestOwnerModel
from notification.models.core_notification_model import NotificationModel
from workflow_manager.models.intermediate_request import IntermediateRequestModel
from iam.models import UserAccountsModel
from workflow_manager.models.approval_level import ApprovalStageModel
import logging
from notification.tasks import send_in_app_notification
from utils.custom_exception_handler import CustomExceptionForError
from rest_framework.response import Response
from notification.models.notification_event_type import NotificationEventTypeModel
from notification.models.notification_preference_model import NotificationPreferenceModel

logger = logging.getLogger(__name__)

# def notify_on_save(sender, instance, **kwargs):
#     if instance.user:
#         NotificationModel.objects.create(
#             notification_recepient=instance.user,
#             notification_message=f"Request '{instance.request.title}' updated.",
#             notification_type="In_app",
#             notification_metadata={'request': str(instance.request.request_id)}
#         )


@receiver(post_save, sender=IntermediateRequestModel)
def notify_on_intermediate_request_save(sender, instance, created, **kwargs):
    """
    Signal to send a notification when an IntermediateRequestModel is created.
    """
    if created:
        try:
            # Call the notification creation function
            create_intermediate_request_notification(instance)
            logger.info(f"Notification triggered for IntermediateRequestModel: {instance.request.title}")
        except Exception as e:
            logger.error(f"Error triggering notification for IntermediateRequestModel: {str(e)}")

        

def create_intermediate_request_notification(intermediate_request):
    try:
        # Extract attributes from the intermediate request
        request = intermediate_request.request
        stage_name = intermediate_request.stage_name
        role = intermediate_request.role
        user = intermediate_request.user
        action_taken = intermediate_request.action_taken
        comments = intermediate_request.comments
        current_state = intermediate_request.current_state

        # Define the recipient (assuming the role or user is the recipient)
        recipient = role.user if hasattr(role, 'user') else user
        logger.info(f"{user.first_name} {user.last_name}")
        logger.info(f"{recipient.first_name} {recipient.last_name}")
        # Notification template and context
        template = NotificationEventTypeModel.objects.get(eventType_name="approval_request")
        context = {
            "request_title": request.title,
            "stage_name": stage_name,
            "action_taken": action_taken,
            "comments": comments,
            "current_state": current_state.state_name,
            "initiator": user.username,
        }

        logger.info(context)

        # Construct a formatted message
        notification_message = template.default_message.format(**context)
        sender = UserAccountsModel.objects.get(username=user.username)
        sender_id = sender.user_account_id
        logger.info(f"sender is {sender} and its id {sender_id}")

        # Send the notification
        send_in_app_notification.delay(
            sender_id=sender_id,
            recipient_id=recipient.user_account_id,
            template_id=template.eventType_id,
            context=context,
            notification_message=notification_message,
        )
        logger.info(f"Notification sent successfully for intermediate request: {request.title}")

    except NotificationEventTypeModel.DoesNotExist:
        logger.error("Notification template for request approval not found.")
    except Exception as e:
        logger.error(f"Unexpected error in creating notification: {str(e)}")