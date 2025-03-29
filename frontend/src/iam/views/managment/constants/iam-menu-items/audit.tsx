import { TabComponentPropsInterface } from "../../../../../app/models/common-models";
import { CommonMenuItemsProps } from "../../../../models/role.models";
import * as RiIcons from 'react-icons/ri'
import LoginEventAuditLogInformation from "../../../sysaudit/audit-components/LoginEventAuditLogInformation";
import * as GrIcons from "react-icons/gr";
import * as BsIcons from "react-icons/bs";

export const audit_logs_menu: CommonMenuItemsProps[] = [
    {
        label: "Overview",
        icon: <GrIcons.GrOverview />,
        path: "audit_logs"
        
    },
    {
        label: "User Activity Logs",
        icon: <BsIcons.BsActivity />,
        path: 'user_activities'
        
    },
    {
        label: "Authentication Logs",
        icon: <RiIcons.RiAddLine />, 
        path: 'auth_logs'
    },
    {
        label: "Authorization Logs",
        icon: <RiIcons.RiAddLine />,
        
    },
    {
        label: "Privilaged Access Logs",
        icon: <RiIcons.RiAddLine />,
        
    },
    {
        label: "System-Level",
        icon: <RiIcons.RiAddLine />,
        
    },
]


export const audit_tab_menu: TabComponentPropsInterface[] = [
    {
        label: "LoginEvent",
        icon: <RiIcons.RiAddLine />,
        tabContent: <LoginEventAuditLogInformation />
    },
    {
        label: "RequestEvent",
        icon: <RiIcons.RiAddLine />,
        tabContent: <h1>Login RequestEvent</h1>
    },
    {
        label: "CRUDEvent",
        icon: <RiIcons.RiAddLine />,
        tabContent: <h1>CRUDEvent</h1>

    },
    {
        label: "Other LogsEvent",
        icon: <RiIcons.RiAddLine />,
        tabContent: <h1>Ohther Login Event</h1>

    },
   
]