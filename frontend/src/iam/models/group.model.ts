import { UserAccountInterfacee } from "./user.model"

export interface GroupInterface {
    group_id?: number,
    group_name: string,
    group_posix_Id: number,
    group_abbreviation: string,
    members: GroupMembersInterface[],
    group_description?: string | undefined
    group_created_at?: string | undefined,
    group_modified_at?: string | undefined,
    has_sub_group?: boolean,
}

export interface GroupMembersInterface {
    first_name: string; 
    last_name: string;
    username: string;
    email:string;
    userId?: number; 
    account_created_at?: string | undefined; 
    account_modified_at?: string | undefined; 
}

export interface SubGroupInterface {
    sub_group_name: string | undefined,
    sub_group_abbreviation: string | undefined,
    group: string,
}

export interface GroupColumn extends GroupInterface{    
    action?: unknown
}

export interface GroupAPIResponse extends GroupInterface{
    status?: number,
    statusText?: string,
    data?: GroupInterface[]  
}


