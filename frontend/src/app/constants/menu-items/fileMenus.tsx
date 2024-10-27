import React from 'react'
import { FileMenuItemInterface } from '../../models/file-menu-models'
import { PiFolderSimplePlusFill } from "react-icons/pi";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import { TabComponentPropsInterface } from '../../models/common-models';
import GetAllDocument from '../../views/files-view/GetAllDocument';


export const file_menu: FileMenuItemInterface[] = [
    {
        label: "File",
        icon: <AiIcons.AiOutlineFile size={20} />,
        iconClose: <MdIcons.MdOutlineArrowDropDown size={20} />,
        iconOpen: <MdIcons.MdOutlineArrowDropUp size={20} />,
        childern: [
            {
                label: "New File",
                icon: <AiIcons.AiOutlineFile size={20} />,
                iconClose: <AiIcons.AiFillCaretRight size={10} />,
                iconOpen: <AiIcons.AiFillCaretLeft size={10} />,
                childern: [
                    {label: "Word file", path: 'create'},
                    {label: "Xlsx file"}
                ]
            },
            {
                label: "Test link",
                childern: [
                    {label: "Word file", path: 'create'},
                    {label: "Xlsx file"}
                ]
            },
        ]
    },
    {
        label: "Other file",
        path: 'create'
    }
]


export const sort_menu = [
    { 
        label: "A-Z",
    },
    { 
        label: "Z-A",
    },
    { 
        label: "Last Modified",
    },
    { 
        label: "First Modified",
    },
    { 
        label: 'Size',
    },
    { 
        label: "Type",
    },
]