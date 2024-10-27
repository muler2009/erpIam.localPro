import { CategoryInterface, MenuItemInterface } from "./side-bar-interface";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io5";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import * as Fa6Icons from "react-icons/fa6";
import * as BsIcons from "react-icons/bs";
import * as IoIoIcons from "react-icons/io";



export const sidear_link: MenuItemInterface[] = [
    {
      label: "Dashboard",
      path: ".",
      icon: <Fa6Icons.FaRegFolder size={17} />
    },
    {
      label: "My Drive",
      path: ".",
      icon: <FaIcons.FaGoogleDrive />,
      children: [
        {
          label: "My Documents",
          path: ".",
          children: [
            {
              label: "Folder",
              path: "library/main",
              icon: <IoIoIcons.IoIosFolder size={15} />
            },
            {
              label: "Files",
              path: "library/files",
              icon: <MdIcons.MdLibraryBooks size={15} />
            },
            {
              label: "Shared",
              path: "library/shared",
              icon: <MdIcons.MdOutlineFolderShared size={15} />
            },
            {
              label: "Archived",
              path: 'library/archvied',
              icon: <MdIcons.MdOutlineFolderZip size={15} />
            },
          ]  
        },
        {
          label: "Deleted Files",
          path: "document/library/trash",
          icon: <IoIcons.IoTrashOutline size={15} />
        },        
      ]
    },
    {
      label: "Tasks",
      path: ".",
      icon: <MdIcons.MdAddTask />,
      children: [
        {
          label: "Delegation",
          path: "delegation",
          icon: <MdIcons.MdOutlineAssignmentInd size={16} />
        }
      ]  
    },


    {
      label: "User Record",
      path: "recent",
      icon: <BsIcons.BsFillDatabaseFill size={17} />
      
    },
    {
      label: "Requests",
      path: "request",
      children: [
        {
          label: "Requests",
          path: "request",
          icon: <FaIcons.FaGoogleDrive />,
        },
        {
          label: "Sent Requests",
          path: "requested-sent",
          icon: <BsIcons.BsSendCheckFill />
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



  