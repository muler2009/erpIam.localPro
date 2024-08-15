from notification.models.workflow_notification import WorkFlowNotification


class SendNotification():
    def __init__(self, recipient, request_instance) -> None:
        # self.message = f"A new request has been assigned to you: {self.request_instance}"
        self.recipient = recipient
        self.request_instance = request_instance

    def send_notification(self):
        message = f"A new request has been assigned to you: {self.request_instance}"

        notification = WorkFlowNotification.objects.create(
            notification_recepient=self.recipient,
            notification_message=message,
            action_taken='request_assigned',  # Type of notification, e.g., 'request_assigned'
            notification_read=False,
        )
        
        return notification