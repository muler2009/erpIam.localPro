from django.contrib import admin
from .models.workflow_state_model import WorkFlowStateModel
from .models.workflow_action_model import WorkFlowActionsModel
from .models.workflow_protocol_model import WorkFlowProtocolModel
from .models.workflow_transition_model import WorkFlowTransitionModel
from .models.request_model import RequestModel, ApprovedRequestByRequestOwnerModel,UnApprovedRequestByOwnerModel, ApprovedRequestsModel
from .models.approval_level import ApprovalStageModel
from .models.approval_processes import ApprovalStageTemplateModel
from .models.intermediate_request import IntermediateRequestModel




# Register your models here.
admin.site.register(WorkFlowStateModel)
admin.site.register(WorkFlowActionsModel)
admin.site.register(WorkFlowProtocolModel)
admin.site.register(WorkFlowTransitionModel)
admin.site.register(ApprovedRequestByRequestOwnerModel)
admin.site.register(UnApprovedRequestByOwnerModel)
admin.site.register(ApprovedRequestsModel)
admin.site.register(ApprovalStageModel)
admin.site.register(ApprovalStageTemplateModel)
admin.site.register(IntermediateRequestModel)




