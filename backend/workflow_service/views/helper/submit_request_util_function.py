from utils.custom_exception_handler import CustomExceptionForError
from ...models.approval_template import ApprovalTemplateModel
from ...models.steps_model import ApprovalStageModel
from .evaluate_entry_criteria import evaluate_entry_criteria
from django.db import transaction
from dmsmodule.document_repository.models.document_version_control import DocumentVersionModel

     
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
    approval_process = submitted_request.approval_process.process_id  # getting the approval process
    # stage_templates = ApprovalTemplateModel.objects.filter(process_type=approval_process).order_by('stage_order') 

    stage_templates = ApprovalTemplateModel.objects.filter(
        process_type=approval_process
        ).select_related("template_entry_criteria").prefetch_related(
            "template_entry_criteria__criteria_items"  # Fetch associated criteria items
        ).order_by("stage_order")
    
    first_template = stage_templates.first()
    entry_criteria = first_template.template_entry_criteria
    print(f"first Template is: {entry_criteria}")

    # Validate entry criteria for the first stage
  

    first_stage = None

    with transaction.atomic():
        for template in stage_templates:
            stage = ApprovalStageModel.objects.create(
                process=submitted_request.approval_process,
                request=submitted_request,
                stage_name=template.stage_name,
                stage_order=template.stage_order,
                entryCriteria=template.template_entry_criteria,
                template=template
            )

            if not evaluate_entry_criteria(stage, submitted_request):
                raise CustomExceptionForError(message="Something went wrong!")

            if first_stage is None:
                first_stage = stage

        if first_stage:
            submitted_request.current_stage = first_stage
            submitted_request.save()
        else:
            raise CustomExceptionForError(message="Failed to create the approval", error_type="APPROVAL_INITIATION_FAILED!")


