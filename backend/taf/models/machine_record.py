import uuid
from django.db import models


class MachineRecord(models.Model):
    record_identifier = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False, unique=True)
    record_new = models.DecimalField(max_digits=15, decimal_places=3)
    record_previous = models.DecimalField(max_digits=15, decimal_places=3)
    record_created_at = models.DateTimeField(auto_now=True)
    record_updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.record_new}"


    class Meta:
        ordering = ["record_created_at"]
        db_table = "Records"
        