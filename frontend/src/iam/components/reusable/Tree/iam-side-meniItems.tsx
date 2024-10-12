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
import { TbReportSearch } from "react-icons/tb";
import * as GrIcons from "react-icons/gr";

export const iamSidebarItems = [
    { 
        path: "/iam", 
        label: "Dashboard", 
        icon: <AiIcons.AiOutlineDashboard />, 
    },
    { 
        path: '.',
        label: "Access management", 
        // icon: <MdIcons.MdOutlineManageAccounts size={20} />,
        children: [
            {
                path: 'users',
                label: 'Users',
                icon: <PiIcons.PiUsersFill />
            },
            {
                path: 'roles',
                label: 'Roles',
                icon: <FaIcons.FaUserCog /> 
            }, 
            {
                path: 'groups',
                label: 'Groups',
                icon: <TiIcons.TiGroup />
            },
              
            {
                path: 'perm_management',
                label: 'Policy Mangement ',
                icon: <MdIcons.MdPolicy />
            },
        ] 
    },
    { 
        path: "audit_logs", 
        label: "Audit Logs", 
        icon: <AiIcons.AiOutlineAudit />, 
    },
    { 
        path: "reports", 
        label: "Report", 
        icon: <BiIcons.BiSolidReport />,
        
    },
    {
        path: "config", 
        label: 'System Configuration',
        icon: <GrIcons.GrConfigure />

    },
]

