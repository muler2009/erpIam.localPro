from django.contrib import admin
from .models.policy_model import PolicyModel
from .models.statement_model import PolicyStatements
from .models.actions_model import PolicyAction
from .models.policy_mocel_modified import OromiaLandPolicy
# Register your models here.

admin.site.register(PolicyModel)
admin.site.register(PolicyStatements)
admin.site.register(PolicyAction)
admin.site.register(OromiaLandPolicy)
