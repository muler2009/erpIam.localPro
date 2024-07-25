from django.dispatch import receiver
from django.db.models.signals import post_save
from iam.models import UserAccountsModel
from iam.groups.models import PosixGroupUserModel

"""
    A signal used to add adding the users to group 
    if group is set stored in its group else it the user is saved in default group
"""

@receiver(post_save, sender=UserAccountsModel)
def add_user_to_group_members(sender, instance, created, **kwargs):
    if created: 
        if instance.group:
            group = instance.group
            group.members.add(instance)
        else:
            group_ = PosixGroupUserModel.objects.get(group_name="active")
            instance.group = group_
            group_.members.add(instance)
