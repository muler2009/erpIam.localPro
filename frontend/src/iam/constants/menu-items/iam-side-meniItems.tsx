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
        icon: <>{AiIcons.AiOutlineDashboard({})}</>, 
    },
    { 
        path: '.',
        label: "Identitiy & Access management", 
        icon: <>{MdIcons.MdOutlineManageAccounts({size: 20})}</>,
        children: [
            {
                path: 'users',
                label: 'User Management',
                icon: <>{PiIcons.PiUsersFill({})}</>
            },
            {
                path: 'roles',
                label: 'Role Management',
                icon: <>{FaIcons.FaUserCog({})}</> 
            }, 
            {
                path: 'groups',
                label: 'Group Management',
                icon: <>{TiIcons.TiGroup({})}</>
            },
              
            {
                path: 'policies',
                label: 'Policy Management ',
                icon: <>{MdIcons.MdPolicy({})}</>
            },
        ] 
    },
    { 
        path: 'audit_logs', 
        label: "Audit Logs", 
        icon: <>{AiIcons.AiOutlineAudit({})}</>, 
        children: [
            {
                path: 'auth_log',
                label: 'Authentication Logs',
                icon: <>{TiIcons.TiGroup({})}</>
            },
            {
                path: 'session_tracking',
                label: 'Session Management Logs',
                icon: <>{PiIcons.PiUsersFill({})}</>
            },
            {
                path: 'activity_log',
                label: 'Activity Logs',
                icon: <>{FaIcons.FaUserCog({})}</> 
            }, 
              
            {
                path: 'compliance',
                label: 'Compliance Reports',
                icon: <>{MdIcons.MdPolicy({})}</>
            },
        ] 
    },
    { 
        path: "reports", 
        label: "Report", 
        icon: <>{BiIcons.BiSolidReport({})}</>,
        
    },
    {
        path: ".", 
        label: 'System Configuration',
        icon: <>{GrIcons.GrConfigure({})}</>,
        children: [
            { 
                path: "notification-setting", 
                label: "Notification Setting", 
                icon: <>{BiIcons.BiBell({})}</>, 
            },
        ]

    },
]

