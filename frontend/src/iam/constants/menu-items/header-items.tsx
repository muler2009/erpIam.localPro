import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as TfiIcons from "react-icons/tfi";
import { HeaderIconsInterface } from "../../models/header-model";


export const headerIconsMenus: HeaderIconsInterface[] = [
    {
        label: "message",
        icon: <BiIcons.BiMessage /> 
    },
    {
        label: "Notification",
        icon: <TfiIcons.TfiBell /> 
    }
]

export const headerAvatorMenus: HeaderIconsInterface[] = [
    {
        label: "Profile",
        icon: <BiIcons.BiMessage />, 
        path: 'profile'
    },
    {
        label: "Logout",
        icon: <AiIcons.AiOutlinePoweroff />,
    }
]