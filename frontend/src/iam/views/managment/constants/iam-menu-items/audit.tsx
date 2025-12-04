import { TabComponentPropsInterface } from "../../../../../app/models/common-models";
import { CommonMenuItemsProps } from "../../../../models/role.models";
import * as RiIcons from 'react-icons/ri'
import LoginEventAuditLogInformation from "../../../sysaudit/audit-components/LoginEventAuditLogInformation";
import * as GrIcons from "react-icons/gr";
import * as BsIcons from "react-icons/bs";
import AccessFailedLogInformation from "../../../sysaudit/audit-components/AccessFailedLogInformation";
import AccessSuccessfulnformation from "../../../sysaudit/audit-components/AccessSuccessfulnformation";
import * as FaIcons from "react-icons/fa6";
import * as BiIcons from "react-icons/bi";
import * as AiIcons from "react-icons/ai";
import AccessFailedLogsUI from "../../../sysaudit/audit-components/AccessFailedLogsUI";
import FailedLogDisplayTypeComponent from "../../../sysaudit/audit-components/FailedLogDisplayTypeComponent";
import LockedAccount from "../../../sysaudit/audit-components/LockedAccount";
import * as Io5Icons from "react-icons/io5";

export const audit_logs_menu: CommonMenuItemsProps[] = [
    {
        label: "Overview",
        icon: <>{GrIcons.GrOverview({})}</>,
        path: "audit_logs"
        
    },
    {
        label: "Authentication Logs",
        icon: <>{RiIcons.RiAddLine({})}</>, 
        path: 'auth_logs'
    },
    {
        label: "User Activity Logs",
        icon: <>{BsIcons.BsActivity({})}</>,
        path: 'user_activities'
    },
    {
        label: "Authorization Logs",
        icon: <>{RiIcons.RiAddLine({})}</>,
        
    },
    {
        label: "Privilaged Access Logs",
        icon: <>{RiIcons.RiAddLine({})}</>,        
    },
    {
        label: "System-Level",
        icon: <>{RiIcons.RiAddLine({})}</>,        
    },
]


export const audit_tab_menu: TabComponentPropsInterface[] = [
    {
        label: "LoginEvent",
        icon: <>{RiIcons.RiAddLine({})}</>,
        tabContent: <LoginEventAuditLogInformation />
    },
    {
        label: "RequestEvent",
        icon: <>{RiIcons.RiAddLine({})}</>,
        tabContent: <h1>Login RequestEvent</h1>
    },
    {
        label: "CRUDEvent",
        icon: <>{RiIcons.RiAddLine({})}</>,
        tabContent: <h1>CRUDEvent</h1>

    },
    {
        label: "Other LogsEvent",
        icon: <>{RiIcons.RiAddLine({})}</>,
        tabContent: <h1>Ohther Login Event</h1>

    },
   
]

export const auth_logs: TabComponentPropsInterface[] = [
    {
        label: "Successful",
        icon: <>{Io5Icons.IoCheckmarkDoneSharp({})}</>,
        tabContent: <AccessSuccessfulnformation />
    },
    {
        label: "Failed",
        icon: <>{AiIcons.AiOutlineStop({})}</>,
        tabContent: (viewType: 'list' | 'table') => <FailedLogDisplayTypeComponent viewType={viewType} />
    },
    {
        label: "Locked account",
        icon: <>{FaIcons.FaUserLock({})}</>,
        tabContent: <LockedAccount />

    },
   
]