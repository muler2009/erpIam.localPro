from typing import Any
from utils.custom_exception_handler import CustomExceptionForError
from dmsmodule.document_repository.models.document_version_control import DocumentVersionModel

MAX_FILE_SIZE = 5 * 1024 * 1024 # max allowd file size to upload
ALLOWED_FILE_EXTENSIONS =  ["pdf", "docx", "xlsx"]  # allowed list of file format


def validate_file_extension(file_name: str) -> None:

    """ Validate the file extension. """

    extension = file_name.split(".")[-1].lower()
    if extension not in ALLOWED_FILE_EXTENSIONS:
        raise CustomExceptionForError(
            message=f"Invalid file format '{extension}'. Allowed formats are {', '.join(ALLOWED_FILE_EXTENSIONS)}.",
            error_type="FILE_FORMAT_ERROR",
        )
    

def validate_file_size(file_size: int) -> None:

    """ Validate the file size. """

    if file_size > MAX_FILE_SIZE:
        raise CustomExceptionForError(
            message=f"File size exceeds the maximum limit of {MAX_FILE_SIZE / (1024)} MB.",
            error_type="FILE_SIZE_EXCEPTION",
        )
    

def check_uploaded_file(file_for_approval_instance: Any) -> None:
    """
    Validates the uploaded file.
    
    :param file_for_approval_instance: An instance of the file to validate.
    :raises CustomExceptionForError: If validation fails.
    """
    # Validate instance
    if not file_for_approval_instance or not isinstance(file_for_approval_instance, DocumentVersionModel):
        raise CustomExceptionForError(
            message="Invalid file instance or file does not belong to DocumentVersionModel.",
            error_type="FILE_ERROR",
        )

    # Validate file extension
    file_name = getattr(file_for_approval_instance.uploaded_file, "name", "")
    validate_file_extension(file_name)

    # Validate file size
    file_size = getattr(file_for_approval_instance.uploaded_file, "size", 0)
    validate_file_size(file_size)

