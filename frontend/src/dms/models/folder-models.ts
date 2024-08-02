export interface FolderColumn {
    folder_identifier: string
    folder_name: string,
    parent_folder?: string;
    subfolder?: FolderDataInterface[] | undefined,
    folder_created_date?: string;
    folder_updated_date?: string;
    uploaded_file?: UploadedDocumentInterface[] | undefined   
}

export interface ModalProps {
    isOpen: boolean;
    handleIsOpenCloseMenu: () => void;
    title: string;
    abbreviation: string;
}

export interface FolderCreateInterface {
    folder_name: string,
    parent_folder?: string;
    subfolder?: FolderDataInterface[] | undefined,
    folder_created_date?: string;
    folder_updated_date?: string;  
    uploaded_file?: UploadedDocumentInterface[] | undefined  
}

export interface FolderDataInterface extends FolderCreateInterface { 
    folder_identifier: string
    folder_name: string;
    parent_folder?: string;
    subfolder?: FolderDataInterface[] | undefined,
    folder_created_date?: string;
    folder_updated_date?: string;  
    uploaded_file?: UploadedDocumentInterface[] | undefined 
   
}

export interface FolderAPIResponseInterface {
    status_code?: number;
    status_text?: string;
}

export interface UploadedDocumentInterface {
    uploaded_document_id: string;
    uploaded_document_name: string;
    uploaded_file?: string; 
    file_url?: string;
    uploaded_file_date?: string;
    updated_file_date?: string;
}

export interface FolderGridViewInterface {
    folder_data: FolderDataInterface
}

export interface FolderListProps {
    handleOptionsAction: () => void,
    title: string;
    folder_data: FolderDataInterface;
    abbreviation: string; 
  }

  export interface FolderTabMenuInterface {
    icon?: React.ReactElement;
    tabContent: React.ReactElement;
    label: string;
    totalValues?: number;
    total?: boolean;
}