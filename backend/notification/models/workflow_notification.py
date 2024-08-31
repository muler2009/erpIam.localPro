# from django.db import models
# from .core_notification_model import NotificationModel
# from workflow_manager.models.workflow_state_model import WorkFlowStateModel
# from workflow_manager.models.request_model import RequestInWorkFlowModel, ApprovedRequestByRequestOwnerModel

# class WorkFlowNotification(NotificationModel):
#     pass
    # request = models.ForeignKey(ApprovedRequestByRequestOwnerModel, on_delete=models.CASCADE, null=True)
    # workflow_state = models.ForeignKey(WorkFlowStateModel, on_delete=models.SET_NULL, null=True)
    # action_taken = models.CharField(max_length=100)

    # def __str__(self) -> str:
    #     return f"{self.notification_recepient}"
    
    # class Meta:
    #     ordering=['notification_id']
    #     db_table = 'Notification'
    #     app_label = 'notification'







    # notification_type = models.CharField(max_length=50, choices=WORKFLOW_NOTIFICATION_TYPE.choices, default=WORKFLOW_NOTIFICATION_TYPE.In_app) # notification type
    # notification_priority = models.CharField(max_length=10, choices=WORKFLOW_NOTIFICATION_PRIORITY.choices, default=WORKFLOW_NOTIFICATION_PRIORITY.Low)
    # notification_sent_status = models.BooleanField(default=False, null=True, blank=True)

    # class WORKFLOW_NOTIFICATION_TYPE(models.TextChoices):
    #     Email = "email", 'email'
    #     SMS = 'sms', 'sms'
    #     In_app = "In_app", "In_app"

    # class WORKFLOW_NOTIFICATION_PRIORITY(models.TextChoices):
    #     Low = "low", 'low'
    #     Medium = 'medium', 'medium'
    #     High = "high", "high"