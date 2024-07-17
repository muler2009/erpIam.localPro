export interface FolderColumn {
    folder_name: string,
    parent_folder?: string;
    subfolder?: FolderDataInterface[] | undefined,
    folder_created_date?: string | undefined;
    folder_updated_date?: string;
    uploaded_file?: UploadedDocumentInterface[] | undefined   
}

export interface FolderDataInterface { 
    folder_name: string,
    parent_folder?: string;
    subfolder?: FolderDataInterface[] | undefined,
    folder_created_date?: string;
    folder_updated_date?: string;  
    uploaded_file?: UploadedDocumentInterface[] | undefined 
    
}

export interface UploadedDocumentInterface {
    uploaded_document_name: string;
    uploaded_file?: string; 
    file_url?: string;
    uploaded_file_date?: string;
    updated_file_date?: string;
}

