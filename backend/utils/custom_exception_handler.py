from rest_framework import serializers, status
from rest_framework.views import exception_handler
from rest_framework.exceptions import APIException, NotAuthenticated
from rest_framework.response import Response
from utils.exceptions.exception_classes import *


# Custom exception handler
def custom_exception_handler(exc, context):
    handlers = {
        'ValidationError': _handle_generic_error,
        'Http404': _handle_generic_error,
        'PermissionDenied': _handle_permission_error,
        'NotAuthenticated': _handle_authentication_error,
        'AlreadyExistAPIException': _handle_already_exist,
        'CustomExceptionForError': _handle_custom_exceptions_error, 
    }
    
    response = exception_handler(exc, context)
    
    exception_class = exc.__class__.__name__
    if exception_class in handlers:
        return handlers[exception_class](exc, context, response)
    
    return response

# Generic error handler
def _handle_generic_error(exc, context, response):
    return response

# Authentication error handler
def _handle_authentication_error(exc, context, response):
    response.data = {
        'message': 'Please log in to continue.',
        'status_code': response.status_code
    }
    return response

# Custom error handler
def _handle_custom_exceptions_error(exc, context, response):
    response.data = {
        'message': exc.message,
        'error_type': exc.error_type,
        'status_code': exc.status_code
    }
    return response

# Permission error handler
def _handle_permission_error(exc, context, response):
    response.data = {
        'message': exc.detail,
        'status_code': response.status_code
    }
    return response


# Generic error handler
def _handle_already_exist(exc, context, response):
    return response

# A custom exception for Authentication related    
class AuthenticationFailedException(APIException):
    def __init__(self, message=None, status_code=401, error_type=None):
        self.message = message
        self.status_code = status_code
        self.error_type = error_type
        super().__init__(message, status_code)
        
    def __str__(self):
        return f"{self.__class__.__name__}: {self.message}"
                
        
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
   
    
    
        



   
    