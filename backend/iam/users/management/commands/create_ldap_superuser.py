# from django.contrib.auth.management.commands import createsuperuser
# from django.core.management import CommandError
# from users.manager import UserAccountsManager
# import getpass
# import ldap
# from users.models import UserAccountsModel

# class Command(createsuperuser.Command):
#     help = "Create a super user with LDAP integration"
#     def handle(self, *args, **options):
#         try:
#             username = input('Username: ')
#             email = input('Email: ')
#             password = getpass.getpass("Enter your password: ", stream=None)
#             first_name = input('First name: ')
#             last_name = input('Last name: ')
            
#             user = UserAccountsModel.objects.create_superuser(first_name=first_name, last_name=last_name, username=username, email=email, password=password)
#             user.first_name = first_name
#             user.last_name = last_name
#             user.is_staff = True
#             user.is_superuser = True
#             user.is_active= True

#             user.save()

#             self.stdout.write(self.style.SUCCESS('Superuser created successfully!'))

#         except CommandError as e:
#             self.stderr.write(str(e))

from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
import getpass

class Command(BaseCommand):
    help = 'Create a super user with LDAP integration'

    def handle(self, *args, **options):
        UserAccountsModel = get_user_model()
        email = input('Email: ')
        username = input('Username: ')
        password = getpass.getpass("Enter your password: ", stream=None)
        first_name = input('First name: ')
        last_name = input('Last name: ')

        user = UserAccountsModel.objects.create_superuser(email=email, username=username, password=password,
                                                          first_name=first_name, last_name=last_name)
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        user.save()

        self.stdout.write(self.style.SUCCESS('Superuser created successfully!'))