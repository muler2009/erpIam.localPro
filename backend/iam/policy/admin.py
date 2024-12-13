from django.contrib import admin
from .models.policy_model import OromiaLandPolicy
from .models.statement_model import PolicyStatements
from .models.actions_model import PolicyAction
from .models.policy_model import OromiaLandPolicy
# Register your models here.

admin.site.register(PolicyStatements)
admin.site.register(PolicyAction)
admin.site.register(OromiaLandPolicy)
