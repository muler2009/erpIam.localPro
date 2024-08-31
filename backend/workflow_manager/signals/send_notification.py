from django.db.models.signals import post_save
from django.dispatch import receiver
from workflow_manager.models.request_model import RequestInWorkFlowModel, ApprovedRequestByRequestOwnerModel
from notification.models.core_notification_model import NotificationModel
import requests
from django.urls import reverse
from django.conf import settings


@receiver(post_save, sender=ApprovedRequestByRequestOwnerModel)
def send_notification_on_request_submission(sender, instance, created, **kwargs):
    if created:  # Check if this is a newly created request
        # Get the concerned user (the user to whom the request is assigned)
       
        NotificationModel.objects.create(
            notification_recepient = instance.request_assigned_to_user, 
            notification_message = f"Your request '{instance.title}' has been requested.",   
            notification_type = "In_app",
            notification_metadata={'request': str(instance.request_id)}
        )

        # Construct the URL for the notification service
        # notification_url = reverse('create-notification')  # Uses the named URL pattern
        # notification_service_url = f'{settings.BASE_URL}{notification_url}'
        
        # try:
        #     response = requests.post(
        #         notification_service_url,
        #         json=payload
        #     )
        #     response.raise_for_status()
        # except requests.exceptions.RequestException as e:
        #     # Handle errors, e.g., log them
        #     print(f"Failed to send notification: {e}")





