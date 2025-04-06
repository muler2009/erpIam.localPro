from django.test import TestCase

# Create your tests here.
from .models.custom_access_log_failure import AccessFailureLogModel
from iam.models import UserAccountsModel
from datetime import datetime
from ..users.helpers.access_log import access_failure_log_record

class AccessLogTestCase(TestCase):

    def setUp(self):
        self.user = UserAccountsModel.objects.create_user(username='testuser', password='testpassword', first_name="muler", last_name="muler", email="user@mail.com")

    def test_create_failure_log(self):
        # Simulate a failed login attempt
        request = self.client.get('/iam/account/login/')
        access_failure_log_record(request, self.user)

        log = AccessFailureLogModel.objects.first()
        self.assertIsNotNone(log)
        self.assertEqual(log.username.username, 'testuser')
        self.assertEqual(log.failure_count, 1)