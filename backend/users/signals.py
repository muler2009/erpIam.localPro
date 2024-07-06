import ldap
from django.conf import settings
from django.dispatch import receiver
from rest_framework.response import Response
from django.db.models.signals import post_save, pre_save, post_delete, m2m_changed
from users.models import UserAccountsModel
from utils.set_default_password import set_default_password

@receiver(pre_save, sender=UserAccountsModel)
def user_pre_save_default_password(sender, instance, *args, **kwargs):
    if not instance.password:
       instance.set_password(set_default_password())




