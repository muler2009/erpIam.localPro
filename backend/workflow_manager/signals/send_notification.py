from django.db.models.signals import post_save
from django.dispatch import receiver
from workflow_manager.models.request_model import RequestInWorkFlowModel, ApprovedRequestByRequestOwnerModel
from notification.models.core_notification_model import NotificationModel
from workflow_manager.models.intermediate_request import IntermediateRequestModel
from iam.models import UserAccountsModel


# @receiver(post_save, sender=ApprovedRequestByRequestOwnerModel)
# def send_notification_on_request_submission(sender, instance, created, **kwargs):
#     if created:  # Check if this is a newly created request
#         # Get the concerned user (the user to whom the request is assigned)
       
#         NotificationModel.objects.create(
#             notification_recepient = instance.request_assigned_to_user, 
#             notification_message = f"Your request '{instance.title}' has been requested.",   
#             notification_type = "In_app",
#             notification_metadata={'request': str(instance.request_id)}
#         )


@receiver(post_save, sender=ApprovedRequestByRequestOwnerModel)
def send_notification_on_request_submission(sender, instance, created, **kwargs):
    if created:  # Check if this is a newly created request
        # Find the current approval stage
        current_stage = instance.current_stage
        if current_stage:
            # Get the role associated with the current stage
            role = current_stage.role

            # Find all users associated with that role
            users_with_role = UserAccountsModel.objects.filter(roles=role)

            # Track the intermediate request and send notifications
            for user in users_with_role:
                # Create an intermediate record for tracking
                # IntermediateRequestModel.objects.create(
                #     request=instance,
                #     stage_name=current_stage.stage_name,
                #     role=role,
                #     user=user,
                #     action_taken="pending",  # Action is "pending" until the user takes action
                #     comments="Awaiting approval"
                # )

                # Send a notification to each user in that role
                NotificationModel.objects.create(
                    notification_recepient=user, 
                    notification_message=f"A request '{instance.title}' is pending your approval.",   
                    notification_type="In_app",
                    notification_metadata={'request': str(instance.request_id)}
                )
     





