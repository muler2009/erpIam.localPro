from django.contrib import admin
from dmsmodule.file_mangement.models.document_uploads_models import DocumentVersion
from dmsmodule.file_mangement.models.document_information import DocumentInformation

admin.site.register(DocumentVersion)
admin.site.register(DocumentInformation)


# Register your models here.
