import React from "react";
import { TabMenuInterface } from "../../models/notification-models";
import { DelegationNotification, NotifcationRecievedComponent } from "../../views/notification/notification-sub-component";
import { BsBell } from "react-icons/bs";
import * as MdIcons from "react-icons/md";
import * as CgIcons from "react-icons/cg";
import * as GrIcons from "react-icons/gr";
import { TabComponentPropsInterface } from "../../models/common-models";

export const notification_item: TabComponentPropsInterface[] = [
    {
        label: "All Notification",
        tabContent: <NotifcationRecievedComponent />,
        total: true,
        // icon: <>{BsBell({})}</>

    },
    {
        label: "Approval",
        tabContent: <h1>Approval Notification</h1>,
        // icon: <MdIcons.MdOutlineApproval />
    },
    {
        label: "Delegation",
        tabContent: <DelegationNotification />,
        // icon: <CgIcons.CgAssign />
    },
    
    {
        label: "System",
        tabContent: <h1>System Notification</h1>,
        // icon: <GrIcons.GrSystem />
    }

]