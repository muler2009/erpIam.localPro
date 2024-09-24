import React from "react";
import { RiLoginCircleFill } from "react-icons/ri";
import * as CiIcons from "react-icons/ci";
import * as HiIcons from "react-icons/hi2";

interface MainScreenMenuPropsInterface {
    label: string;
    icon?: React.ReactElement;
    path: string
}

export const main_screen_menu: MainScreenMenuPropsInterface[] = [
    { label: '', path: '/', icon: <HiIcons.HiHome size={20} />},
    { label: 'Login', path: 'login', icon: <RiLoginCircleFill size={20} />},
    { label: 'Register', path: 'register'},
    { label: 'Help', path: 'help'},

]