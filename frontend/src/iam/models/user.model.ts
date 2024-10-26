import { Label } from "recharts";
import { GroupInterface } from "./group.model";
import { Header } from "@tanstack/react-table";

export interface ModalProps {
    // openCreateIdentity: React.Dispatch<React.SetStateAction<boolean>>;
    openCreateIdentity: () => void
    isOpen: boolean;
    title: string;
   
  }
export interface DropDowns{
  label: string;
  icon?: React.ReactElement;
  onClick?: any
}

export interface UserDashboardProps{
  label: string;
  icon?: React.ReactElement;
  abbrevation?: string; 
  dropdownItems?: DropDowns[]; 
}

export type UserGroup = {
  custom_group_abbreviation: string,
  custom_group_name: string,
}

export interface UserAccountInterface {
  username: string,
  email: string,
  accessType?: boolean,
  authentication?: boolean,
  autoPassword?: string,
  passwordType?: string,
  password?: string, 
  policy?: boolean,
  group?: string | undefined
  gChecked?: boolean
}

export interface UserAccountColumnsInterface {
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    username: string;
    password?: string;
    userType: string;
    status: string; 
    action?: unknown
}

export interface ContextType {
  userData: UserAccountInterfacee;
  setUserData: React.Dispatch<React.SetStateAction<UserAccountInterfacee>>
  handleUserIdentityCreationInputChanges: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
  canSave: boolean;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  userCreationStep: { [key: number]: string };
  disableNext: boolean;
  disablePrev: boolean;
  prevHide?: string; // Make it nullable
  nextHide: string;
  submitHide: string;
  canSubmit: boolean;
}

export interface UserAccountDataInterface {
    firstName: string;
    lastName: string;
    email: string;
    phone: number ;
    username: string;
    password?: string;
    userType: string;
    isActive?: boolean;
    isStaff?: boolean;
}



/** After the document management system  */
export interface UserAccountInterfacee {
  first_name: string; 
  last_name: string;
  username: string;
  email:string;
  userId?: number; 
  password?: string,
  group?: string; 
  home_directory?: string;
  account_created_at?: string | undefined; 
  account_modified_at?: string | undefined; 
  is_staff?: boolean ;
  is_active?: boolean; 
  is_superuser?: boolean;
  gChecked?: boolean;
}

export interface UserCoulumn extends UserAccountInterfacee {
  action?: unknown
}
/** API Response for User API */
export interface UserAPIResponse extends UserAccountInterfacee{
  status_code?: number,
  statusText?: string,
  // data: UserAccountInterfacee[]
}

export interface TableHeaderProps {
  headerColElement: Header<UserAccountInterfacee, unknown>;
  index?: number;
}

export interface IdentityContextType {
  userData: UserAccountInterfacee;
  usernameType: string;
  passwordType: string;
  setUserData: React.Dispatch<React.SetStateAction<UserAccountInterfacee>>;
  setUsernameType: React.Dispatch<React.SetStateAction<string>>;
  setPasswordType: React.Dispatch<React.SetStateAction<string>>;
  handleUserIdentityCreationInputChanges: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUsernameTypeChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
  handleUsernameChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
  handlePasswordTypeChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
  canSave: boolean;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  userCreationStep: { [key: number]: string };
  disableNext: boolean;
  disablePrev: boolean;
  prevHide?: string | boolean;
  nextHide: string | boolean;
  submitHide: string | boolean;
  canSubmit: boolean;
}


export interface UserActionMenuItemsProps {
  label: string;
  icon?: React.ReactElement;
  tabContent?: JSX.Element;
  total?: boolean;
  link_identifier?: string;
  abbrevation?: string;
}

export interface UserModalActionInterface {
  onRequestClose: () => void
  isOpen: boolean
  title: string;
  link_identifier?: string | undefined;
  rowData?:any
}

export interface UserActivationDeactivationAPIresponse {
  status_code: number;
  message: string;
  is_active: boolean;
}










