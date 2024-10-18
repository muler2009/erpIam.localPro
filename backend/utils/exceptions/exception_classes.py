from rest_framework import status
from rest_framework.exceptions import APIException

# Custom exception for resource that already exists
class AlreadyExistAPIException(APIException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = 'Something went wrong'
    default_code = 'already_exists'

    def __init__(self, detail=None, code=None, message=None, status_code=None, error_type=None):
        if message:
            self.detail = message  # Use the provided message if given
        else:
            self.detail = self.default_detail
        
        if status_code:
            self.status_code = status_code  # Use the provided status code if given

        if error_type:
            self.default_code = error_type  # Use the provided error type if given

        super().__init__(detail=detail, code=code)

    def __str__(self):
        return f"{self.__class__.__name__}: {self.detail}"
    
# Custom exception for resource that already exists  

class CustomExceptionForError(APIException):
    status_code = 400
    default_detail = 'Empty'
    default_code = 'error'

    def __init__(self, detail=None, code=None, message=None, error_type=None, status_code=400):
        # Flattening the error message if it's a dict (for validation errors)
        if isinstance(message, dict):
            # Extract the first error message from the dict
            flat_message = next(iter(message.values()))[0]  # Flatten to get a single string
            self.message = flat_message
        else:
            # Use the provided message or the default detail if not provided
            self.message = message if message else self.default_detail
        
        # Assigning additional properties
        self.error_type = error_type
        self.status_code = status_code

        # Optional: store the detailed message for `detail` (used by DRF's APIException)
        self.detail = {
            'message': self.message,
            'error_type': self.error_type,
            'status_code': self.status_code,
        }

    def __str__(self):
        return f"{self.__class__.__name__}: {self.message}"

    

