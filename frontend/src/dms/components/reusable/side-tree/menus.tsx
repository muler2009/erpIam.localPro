import { CategoryInterface, MenuItemInterface } from "./side-bar-interface";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io5";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import * as Fa6Icons from "react-icons/fa6";

export const sidear_link: MenuItemInterface[] = [
    {
      label: "All Files",
      path: ".",
      icon: <Fa6Icons.FaRegFolder size={17} />
    },
    {
      label: "My Devices",
      path: ".",
      children: [
        {
          label: "Library",
          path: ".",
          children: [
            {
              label: "Main",
              path: "library/main",
              icon: <MdIcons.MdLibraryBooks size={15} />
            },
            {
              label: "Shared",
              path: "library/shared",
              icon: <MdIcons.MdOutlineFolderShared size={15} />
            },
            {
              label: "Archived",
              path: "document/library/archive",
              icon: <MdIcons.MdOutlineFolderZip size={15} />
            },
            {
              label: "Deleted Files",
              path: "document/library/trash",
              icon: <IoIcons.IoTrashOutline size={15} />
            }
          ]  
        },
        {
          label: "Uploads",
          path: ".",
          children: [
            {
              label: "Word File",
              path: "document/file/doc",
              icon: <FaIcons.FaFileWord size={15} color="blue" />
            },
            {
              label: "Spreedsheet",
              path: "document/file/xlsx",
              icon: <FaIcons.FaFileExcel size={15} color="green"/>
            },
            {
              label: "Pdf",
              path: "document/file/other",
              icon: <FaIcons.FaFilePdf size={15} color="red" />
            }
          ]  
        },
        
      ]
    },
    {
      label: "Work Flow",
      path: "work-flow",
      children: [
        {
          label: "Requests",
          path: "request"
        },
        {
           label: "Approvals",
          path: "requested-approvals"
        }
      ]
    } ,
    {
      label: "Recents",
      path: "recent",
      icon: <FaIcons.FaRegClock size={17} />
      
    },
    {
      label: "Important",
      path: "important",
      icon: <MdIcons.MdOutlineStarOutline size={18} />
    },     
  ];

export const category: CategoryInterface[] = [
    {
      label: "Trash",
      path: "spreedsheet",
      icon: <IoIcons.IoTrashSharp />
    },
    {
      label: "Adchived",
      path: "compressed",
      icon: <AiIcons.AiOutlineFileZip />

    },
  ]
  
  export default sidear_link;



  