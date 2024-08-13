from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import UserAccountsModel
from iam.user_profile.models import UserProfileModel

# @receiver(post_save, sender=UserAccountsModel)
def create_or_update_profile(sender, created, instance, **kwargs):
    if created:
        UserProfileModel.objects.create(user_profile=instance)

    instance.user_profile.save()

    