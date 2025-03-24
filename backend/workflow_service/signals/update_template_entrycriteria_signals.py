from django.db.models.signals import post_save
from django.dispatch import receiver
from ..models.approval_entry_criteria import ApprovalEntryCriteriaModel
from ..models.approval_template import ApprovalTemplateModel

@receiver(post_save, sender=ApprovalEntryCriteriaModel)
def update_template_entry_criteria(sender, instance, **kwargs):
    if instance.stage:
        # Update the template's entry_criteria
        instance.stage.template_entry_criteria = instance
        instance.stage.save()