import React from "react";


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