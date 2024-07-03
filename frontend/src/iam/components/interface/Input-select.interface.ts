import { RoleInterface } from "../../models/role.models";

type valueProps = string | number;

export interface InputInterface {
    id: string,
    type: string,
    name: string,
    placeholder: string,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    value?: valueProps,
    label?: string,
    className: string,
    desc?: string,
    label_description?: string
    disabled?: boolean | undefined
}

export interface TextInputWithDescWithout {
    id: string;
    type: string;
    name: string;
    placeholder: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    value?: valueProps ;
    label?: string;
    className: string;
    desc?: string;
    rows?: number;
    
}

type Option = {
    role_name: string | number
}

export interface SelectInterface {
   title: string;
   options: Option[] 
}