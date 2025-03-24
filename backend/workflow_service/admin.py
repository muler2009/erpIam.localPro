from django.contrib import admin
from workflow_service.models import *

# Register your models here.
admin.site.register(TemplateModel)
admin.site.register(ApprovalEntryCriteriaModel)
admin.site.register(ApprovalProcessModel)
admin.site.register(ApprovalStageModel)
admin.site.register(ApprovalStepApprovers)
admin.site.register(ApprovalTemplateModel)

admin.site.register(SavedRequestModel)
admin.site.register(SubmittedRequestForApprovalModel)

admin.site.register(WorkflowStateModel)
admin.site.register(WorkflowActionModel)
# admin.site.register(WorkflowProcessTransitionModel)

admin.site.register(FilterItemModel)

