import React from "react";

export interface GroupCreateChildrenInterface {
    children: React.ReactNode
}




export interface GroupModalPropsInterface {
    isOpen: boolean;
    title: string;
    handleIsOpenCloseMenu: () => void;
}

export interface GroupInterface {
    group_id?: number,
    group_name: string,
    group_posix_Id: number,
    group_abbreviation: string,
    members: GroupMembersInterface[] | Members[],
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

interface Members {
    username: string | number;
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

export interface GroupMultiStepInterface {
    [key: number]: React.ReactNode;
}

interface Option {
    username: string | number;
};



interface Step {
    [key: number]: React.ReactNode;
  }

export type GroupCreationSteps = Step[];

export interface GroupContextType {
    groupData: GroupInterface;
    abbreviateGroup: string |undefined;
    selectedOption: Option | null;
    membersOfGroup: Option[]
    isOptionArray: (data: any) => data is Option[]
    setGroupData: React.Dispatch<React.SetStateAction<GroupInterface>>;
    setAbbreviateGroup: React.Dispatch<React.SetStateAction<string>>;
    handleGroupAttributesChange: (event: React.ChangeEvent<HTMLInputElement> |  React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleAutomaticallyTypeChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
    handleGroupAutoChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
    setSelectedOption: React.Dispatch<React.SetStateAction<Option | null>>;
    setMembersOfGroup: React.Dispatch<React.SetStateAction<Option[]>>;
    handleSelectionChange: (option: Option) => void;
    handleStoreToMembersClick: () => void;
    handleBackButtonClick: () => void;
    handleRemoveMember: (memberToRemove: Option) => void;
    canSave: boolean;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    groupCreationStep: { [key: number]: string };
    disableNext: boolean;
    disablePrev: boolean;
    prevHide?: string | boolean;
    nextHide: string | boolean;
    submitHide: string | boolean;
    canSubmit: boolean;
  }

