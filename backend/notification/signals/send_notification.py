from django.db.models.signals import post_save
from django.dispatch import receiver
from workflow_manager.models.request_model import RequestInWorkFlowModel, ApprovedRequestByRequestOwnerModel
from notification.models.workflow_notification import WorkFlowNotification


@receiver(post_save, sender=ApprovedRequestByRequestOwnerModel)
def create_notification_on_request_submission(sender, instance, created, **kwargs):
    if created:  # Check if this is a newly created request
        # Get the concerned user (the user to whom the request is assigned)
        concerned_user = instance.request_assigned_to_user

        # Define the notification message
        message = f"A new request has been assigned to you: {instance.request_type}"

        # Create and save the notification
        WorkFlowNotification.objects.create(
            notification_recepient=concerned_user,
            notification_message=message,
            action_taken='request_assigned',  # Type of notification, e.g., 'request_assigned'
            notification_read=False,
            notification_metadata={'request': str(instance.request_id)}
            
        )



