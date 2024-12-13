from django.dispatch import receiver
from django.db.models.signals import post_save
from ..models.request_model import ApprovalRequestModel
from ..models.approval_process import ApprovalProcessModel
from ..models.approval_step_model import ApprovalStepModel


@receiver(post_save, sender=ApprovalRequestModel)
def create_approval_steps(sender, instance, created, **kwargs):
    if created or instance.status == "pending_for_approval":
        approval_process = instance.approval_process
        if approval_process:
            steps = approval_process.approval_steps.all()
            for step in steps:
                ApprovalStepModel.objects.create(
                    request=instance,
                    step_name=step.step_name,
                    approvers=step.approvers.all(),
                    sequence=step.sequence,
                    entry_criteria=step.entry_criteria,
                )