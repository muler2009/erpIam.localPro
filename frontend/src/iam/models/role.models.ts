export interface CommonMenuItemsProps {
    label: string;
    icon?: React.ReactElement;
    tabContent?: JSX.Element;
    total?: boolean;
    link_identifier?: string;
}

export interface RoleModalPropsInterface {
    onRequestClose: () => void
    isOpen: boolean
    title: string;
    link_identifier?: string | undefined;
}

export interface RoleModalContent {
    [key: string]: JSX.Element;
  }

export interface RoleDataModelInterface {
    role_name: string;
    role_description: string;
    role_status: string;
    role_scope: string;
    role_id: string;
    role_created_at: string | undefined;
    role_modified_date: string | undefined;
}

export interface RoleDataAPIResponse extends RoleDataModelInterface {
    status_code?: number,
    statusText?: string,
}

export interface RoleTableColumn extends RoleDataAPIResponse{
    row_data?: unknown
}


