from django.core.management.base import BaseCommand
from users.models import UserAccountsModel
from django.contrib.auth import get_user_model

class Command(BaseCommand):
    help = 'Synchronize is_active status between CustomUser and auth.user'

    def handle(self, *args, **kwargs):
        User = get_user_model()
        for custom_user in UserAccountsModel.objects.all():
            auth_user = User.objects.get(username=custom_user.username)
            auth_user.is_active = custom_user.is_active
            auth_user.save()
        self.stdout.write(self.style.SUCCESS('Successfully synchronized user status'))