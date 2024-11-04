from django.dispatch import receiver
from django.db.models.signals import post_save
from ..models.delegaiton_model import DelegationModel
from notification.models.core_notification_model import NotificationModel

@receiver(post_save, sender=DelegationModel)
def notify_delegation(sender, instance, created, **kwargs):
    if created: 
        NotificationModel.objects.create(
            notification_recepient=instance.delegatee_user, 
            notification_message=f"You have recieved a delegationrequest '{instance.delegator}' for some days .",   
            notification_type="In_app",
            notification_metadata={'request': str(instance.delegation_id)}
        )