from django.apps import apps
from rest_framework import generics, status, mixins
from rest_framework.response import Response

MODEL_DISPLAY_NAMES = {
    'PosixGroupUserModel': 'Group',
    'IamRoleModel': 'Role',
    'FolderModel': 'Folder',
    'DocumentModel': 'Document',
    'DocumentMetadataModel': 'Document Metadata',
    'DocumentVersionModel': 'Document Version'
    # Add more model name mappings as needed
}


class GetProjectModelRequestHandler(generics.GenericAPIView, mixins.ListModelMixin):
    def get(self, request, *args, **kwargs):
        # Get all the models from the registered apps
        exclude_apps = ['admin', 'auth', 'contenttypes', 'sessions', 'authtoken', 'iam', 'dmsmodule', 'iam_policy', 'workflow_manager']
        organization_model = apps.get_models()

        app_models = {}
        # Iterate over all models
        for model in organization_model:
            app_label = model._meta.app_label

            if app_label in exclude_apps:
                continue

            model_name = model._meta.object_name
            display_name = MODEL_DISPLAY_NAMES.get(model_name, model_name)
            # Add the model name to the corresponding app label group
            if app_label not in app_models:
                app_models[app_label] = []  # Initialize a new list for the app if not already added
            app_models[app_label].append({"model_name": display_name})
        
        # Create the final structured response
        structured_response = []
        for app_label, models in app_models.items():
            structured_response.append({
                "app_name": app_label,
                "models": models
            })
        
        # Return the structured response
        return Response(structured_response)


        return Response(model_list)
