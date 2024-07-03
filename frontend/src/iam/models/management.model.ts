
export interface RoleTabNavigation {
    icon: React.ReactElement;
    tabContent: React.ReactElement;
    description: string;
    label: string;
    total?: boolean;
} 

export interface RoleDropDownDef {
    label: string;  
}

export interface UserTabNavigationDef {
    icon?: React.ReactElement;
    tabContent: React.ReactElement;
    label: string;
    totalValues?: number;
    total?: boolean;
}

export interface UserDropDownDef {
    label: string;  
    icon?: React.ReactElement
}