import { Label } from "recharts";
import * as FaIcons from "react-icons/fa";
import React from "react";
import { PiFolderSimplePlusFill } from "react-icons/pi";
import * as MdIcons from "react-icons/md";
import { LibraryChildrenInterface, LibraryInterface } from "../../models/library-models";
import * as RiIcons from "react-icons/ri";
import { MenuItemsInterface } from "../../models/menu-itms";
import { FaPeopleArrows } from "react-icons/fa6";


export const shared: MenuItemsInterface[] = [
    {
        label: "Type",
        // icon: <PiFolderSimplePlusFill size={20} />,
        // iconClose: <MdIcons.MdOutlineArrowDropDown size={20} />,
        // iconOpen: <MdIcons.MdOutlineArrowDropUp size={20} />,
        childern: [
            {
                label: "Folders",
                icon: <>{FaIcons.FaFolder({})}</>,
                abbreviation: "create_folder"
            },
            {
                label: "Document",
                icon: <>{FaIcons.FaFileWord({})}</>,
                abbreviation: "create_folder"
            },
            {
                label: "Spreedsheet",
                icon: <>{FaIcons.FaFileExcel({})}</>,
                abbreviation: "update_folder"
            },
            {
                label: "Pdf",
                icon: <>{FaIcons.FaFilePdf({})}</>,
                abbreviation: "update_folder"
            },
            {
                label: "Archives",
                icon: <>{FaIcons.FaFileArchive({})}</>,
                abbreviation: "create_folder"
            },
        ]
        
    },
    {
        label: "People",
        // icon: <FaPeopleArrows size={15} />,
        // iconClose: <MdIcons.MdKeyboardArrowRight />,
        // iconOpen: <MdIcons.MdKeyboardArrowLeft />,
        childern: [
            {
                label: "Upload Folder",
                icon: <>{RiIcons.RiFolderUploadFill({})}</>,
                abbreviation: "upload_folder"
            },
            {
                label: "New Word Document",
                icon: <>{FaIcons.FaFileWord({})}</>,
                abbreviation: "open_word_doc"
            },
            {
                label: "New Excel Spreedsheet",
                icon: <>{FaIcons.FaFileExcel({})}</>,
                abbreviation: "excel_doc"
            }
        ]
        
    },

]