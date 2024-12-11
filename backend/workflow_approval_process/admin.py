from django.contrib import admin
from .models import *


admin.site.register(ApprovalProcessModel)
admin.site.register(ApprovalStepApprovers)

admin.site.register(WorkflowActionModel)
admin.site.register(WorkflowProcessTransitionModel)
admin.site.register(WorkflowStateModel)
admin.site.register(ApprovalStepModel)



# Register your models here.
