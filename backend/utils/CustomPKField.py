from typing import Any
import uuid
from django.db import models

class DefaultPrimaryKeyField(models.AutoField):
    def __init__(self, *args: Any, **kwargs: Any) -> None:
        kwargs['db_index']= True
        kwargs['default'] = uuid.uuid4
        kwargs['unique'] = True
        kwargs['editable'] = False
        super().__init__(*args, **kwargs)