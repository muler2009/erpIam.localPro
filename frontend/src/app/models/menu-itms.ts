import React from "react";

export interface MenuItemsInterface {
    label: string;
    icon?: React.ReactElement;
    path?: string;
    abbreviation?: string;
    iconOpen?: React.ReactElement;
    iconClose?: React.ReactElement;
    childern?: ChildItem[];
}

interface ChildItem {
    label: string;
    icon: React.ReactNode;
    abbreviation: string;
  }

