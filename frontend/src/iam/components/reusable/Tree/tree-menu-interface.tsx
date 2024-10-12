
export interface SideMenuInterface {
    menus: TreeMenuItemInterface[] | undefined
}

export interface TreeMenuItemInterface {
    label: string;
    path?: string | null;
    children?: TreeMenuItemInterface[],
    icon?: React.ReactElement,
    name?: string;
}

export interface SideMenuListItemProps {
    listItem: TreeMenuItemInterface;
    controller?: boolean | undefined;
  }
  
export interface DisplayChildrensInterface {
    [key: string]: boolean;
  }