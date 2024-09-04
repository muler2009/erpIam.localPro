import { RoleDataAPIResponse } from "../../iam/models/role.models";
import { UserAccountColumnsInterface } from "../../iam/models/user.model";

export interface SendRequestModalProps {
    open: boolean;
    handleIsOpenCloseMenuModal: () => void;
    title: string;
    abbreviation?: string;
}

export interface StateAPIResponse {
    state_id?: string;
    state_name: string; 
    state_description?: string; 
    state_in_protocol: string;
}

export interface ProcessAPIResponse {
    protocol_id?: string;
    protocol_name?: string; 
    protocol_description?: string; 
}

export interface ProcessAPIResponse {
    status_code?: number,
    statusText?: string,

}

export interface RequestDataInterface {
    title: string; 
    requesting_user?: string; 
    request_assigned_to_user: string; 
    current_state?: string;
    request_type: string; 
    request_sent_at?: string; 
    request_updated_at?: string; 
    description?: string;
    approval_status?: string;
    action_name?: string;
    file_for_approval?: File | null;
    file_url?: string;
    file_name?: string;
    message?: string;
   
}

export interface SendRequestApprovalInterface{
    request_id: string;
    action_name: string;
    file_for_approval?: File | null
}
export interface RequestAPIResponse extends RequestDataInterface {
    status_code?: number,
    statusText?: string,
    message?: string;
}

export interface RequestColumnInterface extends RequestDataInterface  {
    request_id: string;
   
}

export interface RequestTabMenuInterface {
    icon?: React.ReactElement;
    tabContent: React.ReactElement;
    label: string;
    notification?: number;
    total?: boolean;
}

export interface IntermediateAPIResponse {
    user?: UserAccountColumnsInterface; 
    request: RequestColumnInterface; 
    current_state: string;
    stage_name?: string; 
    role: string;
    action_taken?: string
    comments?: string;
    request_recieved_at?: string;
    request_updated_at?: string;

}
