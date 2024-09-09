import os
from utils.custom_exception_handler import PostExceptionHandler

class FileExtensionValidator:
    def __init__(self, extensions=None):
        if extensions is None:
            extensions = ['docx', '.xlsx', '.ppt', '.pdf', '.txt', '.csv',  '.jpg', 'jpeg' ,'.png']
        self.extensions = [convert_to_lower.lower() for convert_to_lower in extensions]  
    
    def __call__(self, file_upload):
        file_path = file_upload.name  # Use .name to get the file name
        file_extension = os.path.splitext(file_path)[1].lower()
        if file_extension not in self.extensions:
            raise PostExceptionHandler(message="Unsupported File format")
        
    def deconstruct(self):
        return ('dmsmodule.helper.file_extension_validator.FileExtensionValidator',(),{'extensions': self.extensions},
    )