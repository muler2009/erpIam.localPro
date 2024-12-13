from django.contrib import admin
from workflow.models import *

# Register your models here.

admin.site.register(ApprovalEntryCriteriaModel)
admin.site.register(ApprovalProcessModel)
admin.site.register(ApprovalRequestModel)
admin.site.register(ApprovalStepModel)
admin.site.register(ApprovalStepApprovers)
admin.site.register(ApprovalTemplateModel)
