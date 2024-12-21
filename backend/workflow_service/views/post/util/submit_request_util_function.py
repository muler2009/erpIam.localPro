from utils.custom_exception_handler import CustomExceptionForError
from ....models.approval_template import ApprovalTemplateModel
from ....models.approval_step_model import ApprovalStepModel


def check_user_allowed_roles(user, approval_process):
    """
    Check if the user has at least one role that matches the allowed roles for the given approval process.
    
    Args:
        user (UserAccountsModel): The current user.
        approval_process (ApprovalProcessModel): The approval process to check against.

    Raises:
        CustomExceptionForError: If the user does not have the required roles to submit a request.
    """
    allowed_roles = approval_process.allowed_submitter.prefetch_related("allowed_submitter_roles")  # Fetch allowed submitter roles
    user_roles = user.roles.all()  # Fetch roles associated with the current user

    if not user_roles.intersection(allowed_roles):
        raise CustomExceptionForError(
            message="You do not have the necessary roles to submit this request.",
            error_type="PERMISSION_DENIED"
        )
    
# utitliy function to create the approval workflow steps
def initiate_approval_workflow(submitted_request):
    approval_process = submitted_request.approval_process.process_id
    print(approval_process)

    stage_templates = ApprovalTemplateModel.objects.filter(process_type=approval_process).order_by('stage_order')
    print(stage_templates)

    first_stage = None

    for template in stage_templates:
        stage = ApprovalStepModel.objects.create(
            process=submitted_request.approval_process,
            request=submitted_request,
            stage_name=template.stage_name,
            stage_order=template.stage_order
        )
        if first_stage is None:
            first_stage = stage

    if first_stage:
        submitted_request.current_stage = first_stage
        submitted_request.save()