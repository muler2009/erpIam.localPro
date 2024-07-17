import React from 'react'
import * as PiIcons from 'react-icons/pi'
import { VscNewFolder } from "react-icons/vsc";
import { FaRegPaste } from "react-icons/fa6";
import { MdDriveFileRenameOutline } from "react-icons/md";

export const folderOptions = [
    {
        label: "Open",
        icon: <PiIcons.PiAcorn />,
        abbreviation: "open_folder"
    },
    {
        label: "Create Folder",
        icon: <VscNewFolder />,
        abbreviation: "create_new_folder"
    },
    {
        label: "Copy",
        icon: <PiIcons.PiCopy />,
        abbreviation: "create_folder"
    },
    {
        label: "Paste",
        icon: <FaRegPaste />,
        abbreviation: "create_folder"
    },
    {
        label: "Rename",
        icon: <MdDriveFileRenameOutline />,
        abbreviation: "create_folder"
    }
]