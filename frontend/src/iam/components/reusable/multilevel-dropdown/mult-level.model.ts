export interface MainMenuInterface {
    menus: DropDownMenuItemInterface[] | undefined
}

export interface DropDownMenuItemInterface {
    label: string;
    children?: DropDownMenuItemInterface[],
    content?: JSX.Element; 
}

export interface MultilevelDropdownInterfac {
    menu: DropDownMenuItemInterface[]; // Expected menu prop
}

export  interface SidemenuProps {
    subMenu: DropDownMenuItemInterface[]; // Array of dropdown menu items
    parentIndexPath: string; // Path index for the current submenu
    openMenus: { [key: string]: boolean }; // Object to track which menus are open
    toggleSubMenu: (indexPath: string) => void; // Function to toggle the submenu open/close
  }
