
import React from "react";
import { UserAccountInterfacee } from "../../models/user.model";

type valueProps = string | number;

export interface InputInterface {
    id: string,
    type: string,
    name: string,
    placeholder: string,
    icon?: React.ReactElement;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    value?: valueProps,
    label?: string,
    className: string,
    desc?: string,
    label_description?: string
    disabled?: boolean | undefined
    checked?: boolean
}

export interface TextInputWithDescWithout {
    id?: string;
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
    username: string | number;
}

export interface SelectInterface {
   title: string;
   options: Option[],
   value?: string | number;
   onChange?: (selected: Option) => void;
}

export interface CustomSelectInterface {
    label: string;
    name?: string
    icon?: React.ReactElement
    options: {label: string}[],
    value?: string | number;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
 }