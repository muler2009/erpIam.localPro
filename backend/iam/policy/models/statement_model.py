import uuid
from django.db import models
from django.utils.translation import gettext_lazy as _
from .policy_model import PolicyModel
from .actions_model import PolicyAction

class PolicyStatements(models.Model):
    """
    Represents an individual statement within a policy
    """

    class EffectChoices(models.TextChoices):
        ALLOW = "allow", _("allow")
        DENY = "deny", _("deny")


    statement_id = models.UUIDField(db_index=True, default=uuid.uuid4, primary_key=True, editable=False, unique=True)
    policy = models.ForeignKey(PolicyModel, related_name='statements_test', on_delete=models.CASCADE)
    effect = models.CharField(max_length=10, choices=EffectChoices)
    actions = models.ManyToManyField(PolicyAction)

    def __str__(self):
        return f"{self.policy.policy_name}"
    
    class Meta:
       db_table = "StatementModel"
       app_label = 'iam_policy'