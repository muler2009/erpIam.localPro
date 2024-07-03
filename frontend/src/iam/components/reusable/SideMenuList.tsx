import React from 'react'
import { SideBar, sidebarItems } from "../../constants/sidebar";
import MenuItem from './MenuItem';

interface SideBarProps {
    sidebarItems: SideBar[],
    controller: boolean
} 

const SideMenuList = ({sidebarItems, controller} : SideBarProps) => {
    return (
        <div className={`text-[13px] font-Poppins `}>
           {
                sidebarItems && sidebarItems.length > 0 
                ? sidebarItems?.map((listItem, index) => <MenuItem key={index} item={listItem} controller={controller} />)
                : null
            }
        </div>
    )
}

export default SideMenuList
