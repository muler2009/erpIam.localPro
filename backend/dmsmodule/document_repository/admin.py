from django.contrib import admin
from .models.document import DocumentModel
from .models.document_metadata import DocumentMetadataModel
from .models.document_version_control import DocumentVersionModel

# Register your models here.
admin.site.register(DocumentVersionModel)
admin.site.register(DocumentMetadataModel)
admin.site.register(DocumentModel)

