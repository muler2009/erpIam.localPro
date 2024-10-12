from django.contrib import admin
from .models.policy_model import PolicyModel
from .models.statement_model import PolicyStatements
from .models.actions_model import PolicyAction
# Register your models here.

admin.site.register(PolicyModel)
admin.site.register(PolicyStatements)
admin.site.register(PolicyAction)