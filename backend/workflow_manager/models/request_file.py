# from django.db import models
# from .request_model import RequestModel
# from .request_model import UnApprovedRequestByOwnerModel
# from dmsmodule.document_repository.models.document_version_control import DocumentVersionModel


# class RequestFileModel(models.Model):
#     request = models.ForeignKey(UnApprovedRequestByOwnerModel, on_delete=models.CASCADE, related_name='files')
#     file_for_approval = models.ForeignKey(DocumentVersionModel, on_delete=models.CASCADE)

#     def __str__(self):
#         return f"File for request: {self.request.title} - {self.file_for_approval.document_name}"  # Assuming `document_name` exists