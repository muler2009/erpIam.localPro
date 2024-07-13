import { CategoryInterface, MenuItemInterface } from "./side-bar-interface";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io5";
import * as MdIcons from "react-icons/md";




export const sidear_link: MenuItemInterface[] = [
    {
      label: "Dashboard",
      path: "dashboard",
    },
    {
      label: "My Document",
      path: "dashboard",
      children: [
        {
          label: "Library",
          path: "dashboard",
          children: [
            {
              label: "Main",
              path: "document/library/main",
              icon: <MdIcons.MdOutlineCloudUpload size={15} />
            },
            {
              label: "Shared",
              path: "document/library/shared",
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
          label: "Placeholder",
          path: "upload"
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
    }      
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



  