from django.db.models.signals import post_save
from django.dispatch import receiver
from workflow_manager.models.request_model import RequestInWorkFlowModel, ApprovedRequestByRequestOwnerModel
from notification.models.core_notification_model import NotificationModel
from workflow_manager.models.intermediate_request import IntermediateRequestModel
from iam.models import UserAccountsModel
from workflow_manager.models.approval_level import ApprovalStageModel
import logging

logger = logging.getLogger(__name__)

@receiver(post_save, sender=IntermediateRequestModel)
def notify_on_save(sender, instance, **kwargs):
    if instance.user:
        NotificationModel.objects.create(
            notification_recepient=instance.user,
            notification_message=f"Request '{instance.request.title}' updated.",
            notification_type="In_app",
            notification_metadata={'request': str(instance.request.request_id)}
        )





