import React from 'react';
import * as BiIcons from 'react-icons/bi'
import * as BsIcons from 'react-icons/bs'
import * as AiIcons from 'react-icons/ai'
import * as PiIcons from 'react-icons/pi'
import * as CiIcons from "react-icons/ci";

interface DropDown {
    label: string;
    path?: string;
    icon: React.ReactElement
}

interface IconNotifyType {
    icons: React.ReactElement;
    content: string;
    bool: boolean,
    path?: string;
}



export const dropdownItems: DropDown[] = [
    { 
        label: "Switch to User", 
        path: '/',
        icon: <BiIcons.BiUserCircle /> 
    },
    { 
        label: "Setting", 
        path: "setting",
        icon: <BsIcons.BsGear /> 
    },
    { 
        label: "Notification",
        path: 'notification', 
        icon: <BsIcons.BsBell />
    },
    { 
        label: "Logout",
        icon: <AiIcons.AiOutlinePoweroff />,
        
    }
]

export const iconNotify: IconNotifyType[] = [
    {
        icons: <CiIcons.CiBellOn size={20} className='text-[#fff] text-opacity-90'/>,
        content: "notification",
        bool: false
    },
    // {
    //     icons: <BsIcons.BsGear className='text-[#fff] text-opacity-90' />,
    //     content: "Setting",
    //     bool: true,
    //     path: 'setting/profile',
    // }
]