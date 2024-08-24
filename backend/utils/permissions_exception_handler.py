from rest_framework.exceptions import PermissionDenied


class DeletePermissionDenied(PermissionDenied):
    status_code = 403  # You can change the status code if needed
    default_detail = "You do not have permission to perform this action."
    default_code = "permission_denied"

    def __init__(self, detail=None, code=None):
        if detail is not None:
            self.detail = {"error": detail}
        else:
            self.detail = {"error": self.default_detail}
        if code is not None:
            self.default_code = code