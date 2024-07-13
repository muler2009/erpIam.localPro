export interface FolderColumn {
    folder_name: string,
    parent_folder?: string;
    subfolder?: FolderDataInterface[],
    folder_created_date?: string | undefined;
    folder_updated_date?: string;   
}

export interface FolderDataInterface { 
    folder_name: string,
    parent_folder?: string;
    subfolder?: FolderDataInterface[],
    folder_created_date?: string;
    folder_updated_date?: string;     
}