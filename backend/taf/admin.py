from django.contrib import admin
from .models.machine_record import MachineRecord
from .models.taf_machine import MachineModel

# Register your models here.

admin.site.register(MachineModel)
admin.site.register(MachineRecord)
