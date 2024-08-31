from django.core.management.base import BaseCommand
from workflow_manager.models.workflow_protocol_model import WorkFlowProtocolModel
from workflow_manager.models.workflow_state_model import WorkFlowStateModel
from workflow_manager.models.workflow_action_model import WorkFlowActionsModel
from workflow_manager.models.workflow_transition_model import WorkFlowTransitionModel

from django.contrib.auth.models import User

class Command(BaseCommand):
    help = 'Populate the database with example data for Process, State, Action, and Transition models.'

    def handle(self, *args, **kwargs):

        document_approval_process = WorkFlowProtocolModel.objects.create(protocol_name='Documnet approval process', protocol_description="Document approval processes")
        leave_process = WorkFlowProtocolModel.objects.create(protocol_name='Leave process', protocol_description="approval processes for leave")

        # Create states 
        # approved_by_owner = WorkFlowStateModel.objects.create(state_name='Approved by owner', state_description="approved by owner state", state_in_protocol=document_approval_process)
        Approved = WorkFlowStateModel.objects.create(state_name='approved', state_description="Approved state", state_in_protocol=document_approval_process)
        not_approved = WorkFlowStateModel.objects.create(state_name='Not Approved by Owner', state_description="Not Approved by Owner state", state_in_protocol=document_approval_process)
        pending = WorkFlowStateModel.objects.create(state_name='pending for approval', state_description="pending for approval state", state_in_protocol=document_approval_process)
        rejected = WorkFlowStateModel.objects.create(state_name='Rejected', state_description="Rejected state", state_in_protocol=document_approval_process)
        rejected_with_reservation = WorkFlowStateModel.objects.create(state_name='Rejected with Modification', state_description="Rejected with Modification state", state_in_protocol=document_approval_process)

        # Create actions
        approved = WorkFlowActionsModel.objects.create(action_name='approved', action_description="Approved Action", action_protocol=document_approval_process)
        rejected_without_modification = WorkFlowActionsModel.objects.create(action_name='Rejected', action_description="Rejected without reseravation Action", action_protocol=document_approval_process)
        rejected_with_modification = WorkFlowActionsModel.objects.create(action_name='Rejected With Modification', action_description="Rejected_With_Modification Action", action_protocol=document_approval_process)
        submitted = WorkFlowActionsModel.objects.create(action_name='submitted', action_description="approved by owner Action", action_protocol=document_approval_process)
       
        # Create example transitions
        WorkFlowTransitionModel.objects.create(
            transition_name= "Approve",
            action_name = approved,
            protocol_name = document_approval_process,
            from_state = pending,
            to_state = Approved,   
        )

        WorkFlowTransitionModel.objects.create(
            transition_name= "Reject",
            action_name = rejected_without_modification,
            protocol_name = document_approval_process,
            from_state = pending,
            to_state = rejected,   
        )

        WorkFlowTransitionModel.objects.create(
            transition_name= "Reject without Modification",
            action_name = rejected_with_modification,
            protocol_name = document_approval_process,
            from_state = pending,
            to_state = rejected_with_reservation
        )

        WorkFlowTransitionModel.objects.create(
            transition_name= "Submit_Transition",
            action_name = submitted,
            protocol_name = document_approval_process,
            from_state = not_approved,
            to_state = pending,   
        )
        
        self.stdout.write(self.style.SUCCESS('Successfully populated the workflow with to the table data.'))

       