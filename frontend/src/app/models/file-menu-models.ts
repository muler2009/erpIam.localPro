import React from "react";
export interface FileAPIResponseInterface {
    status_code?: number;
    status_text?: string;
}


export interface FileMenuItemInterface {
    label: string;
    icon?: React.ReactElement;
    path?: string;
    iconOpen?: React.ReactElement;
    iconClose?: React.ReactElement;
    childern?: FileMenuItemInterface[];
}

interface ChildItem {
    label: string;
    icon?: React.ReactNode;
    path?: string;
    children?: ChildItem[]
  }