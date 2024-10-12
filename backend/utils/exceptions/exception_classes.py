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

    def __init__(self, detail=None, code=None, message=None, error_type=None, status_code=404):
        self.message = message
        self.error_type = error_type
        self.status_code = status_code
        if message:
            self.message = message
        else:
            self.message = self.default_detail
        
    def __str__(self):
        return f"{self.__class__.__name__}: {self.detail}"


    

