import uuid
from django.db import models
from .machine_record import MachineRecord

class MachineModel(models.Model):
    machine_id = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True, editable=False)
    machine_name = models.CharField(max_length=255)
    machine_code = models.CharField(max_length=255)
    new_record = models.DecimalField(max_digits=15, decimal_places=3, null=True)
    previous_record = models.DecimalField(max_digits=15, decimal_places=3, null=True)
    # sold_qty = models.DecimalField(max_digits=15, decimal_places=3, null=True, blank=True)

    def __str__(self):
        return f"{self.machine_name}-{self.machine_code}"
    
    class Meta:
        ordering =["machine_name"]
        db_table = "Machine"
        app_label = "taf"

    def save(self, *args, **kwargs):
        # if not self.new_record or not self.previous_record:  # Check if the instance is being created
        #     self.new_record=0.0
        #     self.previous_record=0.0

        # if not self.sold_qty:
        #     sold_qty = self.new_record - self.previous_record
        #     self.sold_qty = sold_qty
            
        return super().save(*args, **kwargs)