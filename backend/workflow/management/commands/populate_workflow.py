from django.core.management.base import BaseCommand
from ...models.workflow_state_model import WorkflowStateModel
from ...models.workflow_transition_model import WorkflowProcessTransitionModel
from ...models.workflow_action_model import WorkflowActionModel
from ...models.approval_type_model import ApprovalProcessTypeModel

class Command(BaseCommand):
    help = 'Populate the database with example data for Process, State, Action, and Transition models.'

    def handle(self, *args, **options):

        document_appproval = ApprovalProcessTypeModel.objects.create(
            protocol_name="Document Approval",
            protocol_type="document",
            is_active=True,
            description = "Document approval process description"
        )

        # Create states 
        # approved_by_owner = WorkFlowStateModel.objects.create(state_name='Approved by owner', state_description="approved by owner state", state_in_protocol=document_approval_process)
        Approved = WorkflowStateModel.objects.create(state_name='approved', state_description="Approved state", state_in_protocol=document_appproval)
        not_approved = WorkflowStateModel.objects.create(state_name='Not Approved by Owner', state_description="Not Approved by Owner state", state_in_protocol=document_appproval)
        pending = WorkflowStateModel.objects.create(state_name='pending for approval', state_description="pending for approval state", state_in_protocol=document_appproval)
        rejected = WorkflowStateModel.objects.create(state_name='Rejected', state_description="Rejected state", state_in_protocol=document_appproval)
        rejected_with_reservation = WorkflowStateModel.objects.create(state_name='Rejected with Modification', state_description="Rejected with Modification state", state_in_protocol=document_appproval)

        # # Create actions
        approved = WorkflowActionModel.objects.create(action_name='approved', action_description="Approved Action", action_protocol=document_appproval)
        rejected_without_modification = WorkflowActionModel.objects.create(action_name='Rejected', action_description="Rejected without reseravation Action", action_protocol=document_appproval)
        rejected_with_modification = WorkflowActionModel.objects.create(action_name='Rejected With Modification', action_description="Rejected_With_Modification Action", action_protocol=document_appproval)
        submitted = WorkflowActionModel.objects.create(action_name='submitted', action_description="approved by owner Action", action_protocol=document_appproval)
       
        # Create example transitions
        WorkflowProcessTransitionModel.objects.create(
            transition_name= "Approve",
            action_name = approved,
            protocol_name = document_appproval,
            from_state = pending,
            to_state = Approved,   
        )

        WorkflowProcessTransitionModel.objects.create(
            transition_name= "Reject",
            action_name = rejected_without_modification,
            protocol_name = document_appproval,
            from_state = pending,
            to_state = rejected,   
        )

        WorkflowProcessTransitionModel.objects.create(
            transition_name= "Reject without Modification",
            action_name = rejected_with_modification,
            protocol_name = document_appproval,
            from_state = pending,
            to_state = rejected_with_reservation
        )

        WorkflowProcessTransitionModel.objects.create(
            transition_name= "Submit_Transition",
            action_name = submitted,
            protocol_name = document_appproval,
            from_state = not_approved,
            to_state = pending,   
        )
        
        self.stdout.write(self.style.SUCCESS('Successfully populated the workflow with to the table data.'))