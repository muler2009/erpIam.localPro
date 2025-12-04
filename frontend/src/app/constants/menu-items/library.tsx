import React from "react";
import { PiFolderSimplePlusFill } from "react-icons/pi";
import * as MdIcons from "react-icons/md";
import { LibraryChildrenInterface, LibraryInterface } from "../../models/library-models";
import * as RiIcons from "react-icons/ri";
import * as FaIcons from "react-icons/fa";

export const library: LibraryInterface[] = [
    {
        label: "Folder",
        // icon: <PiFolderSimplePlusFill size={20} />,
        // iconClose: <MdIcons.MdOutlineArrowDropDown size={20} />,
        // iconOpen: <MdIcons.MdOutlineArrowDropUp size={20} />,
        childern: [
            {
                label: "Create Folder",
                icon: <>{PiFolderSimplePlusFill({})}</>,
                abbreviation: "create_folder"
            },
            {
                label: "Add File",
                icon: <>{PiFolderSimplePlusFill({})}</>,
                abbreviation: "update_folder"
            }
        ]
        
    },
    {
        label: "Upload",
        // icon: <MdIcons.MdUpload size={15} />,
        // iconClose: <MdIcons.MdOutlineArrowDropDown size={20} />,
        // iconOpen: <MdIcons.MdOutlineArrowDropUp size={20} />,
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