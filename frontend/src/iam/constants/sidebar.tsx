import React from "react";
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import * as RxIcons from 'react-icons/rx';
import * as BiIcons from 'react-icons/bi';
import * as IoIcons from 'react-icons/io5';
import * as VscIcon from 'react-icons/vsc';
import * as TiIcons from "react-icons/ti";
import * as PiIcons from "react-icons/pi";
import * as MdIcons from "react-icons/md";

export interface SideBar {
    label: string;
    path?: string; 
    icon?: React.ReactElement;
    iconClosed?: React.ReactElement;
    iconOpened?: React.ReactElement;
    submenu?: SubMenuItems[];
}
  
interface SubMenuItems extends SideBar{
    path: string;
    label: string;
    icon: React.ReactElement;
    iconClosed?: React.ReactElement;
    iconOpened?: React.ReactElement;
}

export const sidebarItems: SideBar[] = [
    { 
        path: "/iam", 
        label: "Dashboard", 
        icon: <AiIcons.AiOutlineDashboard />,
        iconClosed: <PiIcons.PiFolderSimplePlusLight size={20}/>,
        iconOpened: <PiIcons.PiFolderSimpleMinusLight size={20}/>,   
    },
    { 
        path: '.',
        label: "Access management", 
        icon: <MdIcons.MdOutlineManageAccounts size={20} />,
        iconOpened: <RxIcons.RxCaretUp size={20}/>,
        iconClosed: <RxIcons.RxCaretDown size={20}/>,    
        submenu: [
            {
                path: 'groups',
                label: 'Groups',
                icon: <TiIcons.TiGroup />,
                iconClosed: <PiIcons.PiFolderSimplePlusLight size={20}/>,
                iconOpened: <PiIcons.PiFolderSimpleMinusLight size={20}/>,   
               
            },
            {
                path: 'role_management',
                label: 'Roles',
                icon: <VscIcon.VscOrganization />,
                iconClosed: <PiIcons.PiFolderSimplePlusLight size={20}/>,
                iconOpened: <PiIcons.PiFolderSimpleMinusLight size={20}/>,   
               
            },
            {
                path: 'users',
                label: 'Users',
                icon: <FaIcons.FaRegUser />,
                iconClosed: <PiIcons.PiFolderSimplePlusLight size={20}/>,
                iconOpened: <PiIcons.PiFolderSimpleMinusLight size={20}/>,   
            },
       
            {
                path: 'perm_management',
                label: 'Permission System',
                icon: <VscIcon.VscOrganization />,
                iconClosed: <PiIcons.PiFolderSimplePlusLight size={20}/>,
                iconOpened: <PiIcons.PiFolderSimpleMinusLight size={20}/>,   
            },
            {
                path: 'accountsetting',
                label: 'Account Setting',
                icon: <VscIcon.VscOrganization />,
                iconClosed: <PiIcons.PiFolderSimplePlusLight size={20}/>,
                iconOpened: <PiIcons.PiFolderSimpleMinusLight size={20}/>,   
            },
        ] 
    },
    { 
        path: "tasks", 
        label: "Tasks", 
        icon: <FaIcons.FaUserCog />,
        iconClosed: <PiIcons.PiFolderSimplePlusLight size={20}/>,
        iconOpened: <PiIcons.PiFolderSimpleMinusLight size={20}/>,   
    },
    { 
        path: "reports", 
        label: "Report", 
        icon: <FaIcons.FaUserCog />,
        iconClosed: <PiIcons.PiFolderSimplePlusLight size={20}/>,
        iconOpened: <PiIcons.PiFolderSimpleMinusLight size={20}/>,   
    },
    {
        path: "config", 
        label: 'System Configuration',
        icon: <VscIcon.VscOrganization />,
        iconClosed: <PiIcons.PiFolderSimplePlusLight size={20}/>,
        iconOpened: <PiIcons.PiFolderSimpleMinusLight size={20}/>,  
       

    },
]

