import React from "react"
import { NavigationMenuProps } from "../../../models/common-models"
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import * as Fa6Icons from "react-icons/fa6";
import * as BsIcons from "react-icons/bs";

export const metaDataMenu: NavigationMenuProps[] = [
    {
        label: "Edit",
        icon: <AiIcons.AiOutlineEdit  />,
        miniWindow: false,
    },
    {
        label: "Share",
        icon: <MdIcons.MdShare />,
        miniWindow: false,
    },
    {
        label: "Upload",
        icon: <MdIcons.MdUploadFile />,
        miniWindow: false,
       
    },
]
export const clientMenu: NavigationMenuProps[] = [
    {
        label: "Dashboard",
        icon: <AiIcons.AiOutlineDashboard />,
        miniWindow: false,
    },
    {
        label: "Approved Request",
        icon: <MdIcons.MdPendingActions />,
        path: "_approved",
        miniWindow: false,
        notify: null,
    },
    {
        label: "Pending Request",
        icon: <MdIcons.MdPendingActions />,
        path: "_pending",
        miniWindow: false,
        notify: null,
       
    },
    {
        label: "Track Approval",
        icon: <MdIcons.MdOutlineLocationOn />,
        path: "track-approvals",
        miniWindow: false,
    },
    {
        label: "Drive",
        icon: <Fa6Icons.FaGoogleDrive />,
        path: "drive",
        miniWindow: false,
    },
    {
        label: "Notification",
        icon: <IoIcons.IoIosNotificationsOutline />,
        path: "notification",
        miniWindow: false,
    }
]