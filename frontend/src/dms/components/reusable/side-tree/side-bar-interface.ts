import React from "react";

export interface MenuItemInterface {
    label: string;
    path?: string ,
    children?: MenuItemInterface[],
    icon?: React.ReactElement
}

export interface CategoryInterface {
    label: string;
    icon?: React.ReactElement;
    path?: string;
}