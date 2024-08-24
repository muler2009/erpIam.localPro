from django.core.management import BaseCommand
from iam.groups.models import PosixGroupUserModel


class Command(BaseCommand):
    help = 'Populate the database with example data for Process, State, Action, and Transition models.'

    def handle(self, *args, **kwargs):

        # Create 'active' group
        active_group = PosixGroupUserModel.objects.create(
            group_name="active",
            group_posix_Id=0,
            group_abbreviation="ACD001",
            group_description="Default Users members"
        )
        active_group.members.set([])  # Assign members if any

        # Create 'student' group
        student_group = PosixGroupUserModel.objects.create(
            group_name="student",
            group_posix_Id=0,
            group_abbreviation="STD001",
            group_description="Student Users members"
        )
        student_group.members.set([])

        # Create 'admin' group
        admin_group = PosixGroupUserModel.objects.create(
            group_name="admin",
            group_posix_Id=0,
            group_abbreviation="AD001",
            group_description="Admin Users members"
        )
        admin_group.members.set([])

        # Create 'Directors' group
        directors_group = PosixGroupUserModel.objects.create(
            group_name="Directors",
            group_posix_Id=0,
            group_abbreviation="DI001",
            group_description="Directors Users members"
        )
        directors_group.members.set([])

        self.stdout.write(self.style.SUCCESS('Successfully populated the groups with data.'))