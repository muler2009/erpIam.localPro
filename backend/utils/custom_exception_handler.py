from rest_framework import serializers
from rest_framework.views import exception_handler
from rest_framework.exceptions import APIException, AuthenticationFailed, NotFound
from rest_framework.response import Response

def custom_exception_handler(exc, context):
    handler = {
        'ValidationError': _handle_generic_error,
        'Http404': _handle_generic_error,
        'PermissionDenied': _handle_generic_error,
        'NotAuthenticated': _handle_authentication_error
        
    }
    response = exception_handler(exc, context)
    
    exception_class = exc.__class__.__name__
    if exception_class in handler:
        return handler[exception_class](exc, context, response)
    
def _handle_generic_error(exc, context, response):
    return response

def _handle_authentication_error(exc, context, response):
    response.data = {
        'ERROR': 'Please login to continue',
        'STATUS_CODE': response.status_code
    }
    
    return response


class AlreadyExists(APIException):
    default_code = 'already_exists'
    default_detail = 'Data you are inserting already exist'
    status_code = 400

# A custom exception for Instance with duplicated entry
class AlreadyExistAPIException(APIException):
    status_code = 400
    default_detail = 'Instance Already exists'
    default_code = 'ALREADY_EXIST'

    def __init__(self, detail=None, code=None, message=None, status_code=None, error_type=None):
        self.message = message
        self.status_code = status_code
        self.error_type = error_type
        super().__init__(message, status_code)

        if self.message is not None:
            self.message = message
        else:
            self.detail = self.default_detail

        if self.error_type is not None:
            self.error_type = error_type
        else:
            self.error_type = self.default_code
        
        if code is not None:
            self.default_code = code
        
    def __str__(self):
        return f"{self.__class__.__name__}: {self.message}"


# A custom exception for Authentication related    
class AuthenticationFailedException(APIException):
    def __init__(self, message=None, status_code=401, error_type=None):
        self.message = message
        self.status_code = status_code
        self.error_type = error_type
        super().__init__(message, status_code)
        
    def __str__(self):
        return f"{self.__class__.__name__}: {self.message}"
            
            
    
class CustomExceptionHandler(APIException):
    def __init__(self, message=None, status_code=400, error_type=None):
        self.message = message
        self.status_code = status_code
        self.error_type = error_type
        super().__init__(message, status_code)
        
    def __str__(self):
        return f"{self.__class__.__name__}: {self.message}"    


class EmptyExceptionHandler(APIException):
    status_code = 404
    default_detail = 'Empty'
    default_code = 'error'

    def __init__(self, detail=None, code=None, message=None, error_type=None, status_code=404):
        self.message = message
        self.error_type = error_type
        self.status_code = status_code
        if message is not None:
            self.message = message
        else:
            self.message = self.default_detail

        # if message:
        #     self.detail['message'] = message
        # if error_type:
        #     self.detail['error_type'] = error_type
        # if code is not None:
        #     self.detail['code'] = code


        
# custom validation class overriding ValidationError
class CustomSerializerValidationError(serializers.ValidationError):
    """_summary_
        Custom Validation Error handler during serilizing
    """
    def __init__(self, detail=None, code=None, error_type=None):
        self.detail = detail
        self.error_type =error_type
        super().__init__(detail, code)
        

class CustomObjectDoesNotExist(APIException):
    def __init__(self, message=None, code=404):
        self.message = message
        self.code = code
        super().__init__(self.message)

    def __str__(self):
        return f"{self.__class__.__name__}: {self.message}"    
   
    
    
        



   
    