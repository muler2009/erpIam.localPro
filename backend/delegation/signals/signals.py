from django.dispatch import receiver
from django.db.models.signals import post_save
from ..models.delegaiton_model import DelegationModel
from notification.models.core_notification_model import NotificationModel
from notification.tasks import send_notification

@receiver(post_save, sender=DelegationModel)
def delegation_notification(sender, instance, created, **kwargs):
    if created:
        send_notification.delay(
            notification_recepient_id=instance.delegatee_user.user_account_id,  # Ensure this is the ID
            notification_message=f"You have received a delegation request from '{instance.delegator.first_name} {instance.delegator.last_name} for some days.",
            notification_type="In_app",
            notification_metadata={'Delegation': str(instance.delegation_id)},
            notification_sender=f"{instance.delegator.first_name} {instance.delegator.last_name}"
        )