import { UserAccountDataInterface } from "./user.model";

export interface CommonMenuItemsProps {
    label: string;
    icon?: React.ReactElement;
    tabContent?: JSX.Element;
    total?: boolean;
    link_identifier?: string;
    path?: string;
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
    role_id?: string;
    role_name: string;
    role_description: string;
    role_status: string;
    role_scope: string;
    users: (string | number)[];
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

interface Option {
    username: string | number;
};


export interface RoleContextInterface {
    roleData: RoleDataModelInterface;
    membersOfGroup: Option[];
    setRoleData: React.Dispatch<React.SetStateAction<RoleDataModelInterface>>
    handleRoleDataCreationInputChanges: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement> ) => void;
    isOptionArray: (data: any) => data is Option[];
    setSelectedOption: React.Dispatch<React.SetStateAction<Option | null>>;
    setMembersOfGroup: React.Dispatch<React.SetStateAction<Option[]>>;
    handleSelectionChange: (option: Option) => void;
    handleStoreToMembersClick: () => void;
    handleBackButtonClick: () => void;
    handleRemoveMember: (memberToRemove: Option) => void;
    canSave: boolean;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    roleCreationStep: { [key: number]: string };
    disableNext: boolean;
    disablePrev: boolean;
    prevHide?: string | boolean;
    nextHide: string | boolean;
    submitHide: string | boolean;
    canSubmit: boolean;
  }


