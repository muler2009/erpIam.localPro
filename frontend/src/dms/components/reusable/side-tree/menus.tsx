import { CategoryInterface, MenuItemInterface } from "./side-bar-interface";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io5";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";

export const sidear_link: MenuItemInterface[] = [
    {
      label: "Dashboard",
      path: ".",
    },
    {
      label: "My Document",
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
              label: "Trash",
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
        {
          label: "Requests",
          path: "request",
          icon: <MdIcons.MdApproval size={18} />
        },
        {
          label: "Shared Document",
          path: "upload"
        }
      ]
    },
    {
      label: "Search",
      path: "search",
      children: [
        {
          label: "basic search",
          path: "basic-search"
        },
        {
          label: "Advanced search",
          path: "advanced-search"
        }

      ]
    },
    {
      label: "Work Flow",
      path: "work-flow",
      children: [
        {
          label: "Pending Approvals",
          path: "pending-approvals"
        },
        {
           label: "Requested Approvals",
          path: "requested-approvals"
        }
      ]
    } ,
    {
      label: "Request",
      path: "requests",
      icon: <MdIcons.MdApproval size={18} />
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



  