import uuid
from django.db import models


class TemplateModel(models.Model):
    template_identifier = models.UUIDField(default=uuid.uuid4, db_index=True, primary_key=True, editable=False, unique=True)
    template_name = models.CharField(max_length=100)


    def __str__(self):
        return f"{self.template_name}"

    class Meta:
        db_table = "Template"