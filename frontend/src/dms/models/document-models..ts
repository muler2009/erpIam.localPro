export interface FileUploadColumnInterface {
    document_id: string;
    document_name: string;
    uploaded_file?: string; 
    file_url?: string;
    uploaded_file_date?: string;
    updated_file_date?: string;
}

export interface DocumentVersionInterface {
    document_version_id: string;
    version_number: number;
    uploaded_file?: string; 
    uploaded_at?: string;
    is_current: boolean;
    document?: DocumentInterface;
    uploaded_by?: string;
}

export interface DocumentInterface {
    document_information_id: string;
    document_name: string;
    folder?: string; 
    created_by?: string;
    created_at?: string;
    current_version: DocumentVersionInterface;
}

export interface DocumentUploadInterface {
    document_name?: string;
    folder_name?: string;
    file: File | null
}


export interface DocumentAPIInterface extends DocumentInterface {
    status_code: number;
    status_text: string;
}