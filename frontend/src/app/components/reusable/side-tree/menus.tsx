import { CategoryInterface, MenuItemInterface } from "./side-bar-interface";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io5";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import * as Fa6Icons from "react-icons/fa6";
import * as BsIcons from "react-icons/bs";
import * as IoIoIcons from "react-icons/io";
import * as GoIcons from "react-icons/go";
import * as GrIcons from "react-icons/gr";
import * as RiIcons from "react-icons/ri";




export const sidear_link: MenuItemInterface[] = [
    {
      label: "Dashboard",
      path: ".",
      icon: <>{Fa6Icons.FaRegFolder({size: 15})}</> 
    },
    {
      label: "Documents",
      path: ".",
      icon: <>{GrIcons.GrDocumentStore({size: 15})}</>,
      children: [
        {
          label: "Drive",
          path: "library/files",
          icon: <>{FaIcons.FaGoogleDrive({size: 15})}</>,
          children: [
            {
              label: "My Files",
              path: "library/files",
              icon: <>{MdIcons.MdLibraryBooks({size: 15})}</>
            },
            {
              label: "Shared",
              path: "library/shared",
              icon: <>{MdIcons.MdOutlineFolderShared({size: 15})}</>
            },
            {
              label: "Archived",
              path: 'library/archvied',
              icon: <>{MdIcons.MdOutlineFolderZip({size: 15})}</>
            },
            {
              label: "Trash",
              path: 'library/archvied',
              icon: <>{IoIcons.IoTrashOutline({size: 15})}</>
            },
          ]  
        },
        {
          label: "User Data Manager",
          path: "library/main",
          icon: <>{RiIcons.RiFolder4Fill({size: 15})}</>
        },
        {
          label: "Deleted Files",
          path: "document/library/trash",
          icon: <>{IoIcons.IoTrashOutline({size: 15})}</>
        },        
      ]
    },
  
    {
      label: "Workflow",
      path: ".",
      icon: <>{GoIcons.GoWorkflow({size: 15})}</>,
      children: [
        {
          label: "Requests",
          path: "request",
          icon: <>{BsIcons.BsCardChecklist({size: 15})}</>

        },
        {
          label: "Delegation",
          path: "delegation",
          icon: <>{AiIcons.AiOutlineUserSwitch({size: 15})}</>
        }
      ]
    } 
  ];

  export const sidearBarLink: MenuItemInterface[] = [
    {
      label: "Notification",
      path: "notification",
      icon: <>{BsIcons.BsBellFill({size: 15})}</>      
    },
    {
      label: "Setting",
      path: "setting",
      icon: <>{IoIcons.IoSettingsOutline({size: 15})}</>,
      children: [
        {
          label: "Profile Setting",
          path: "profile",
          icon: <>{FaIcons.FaGoogleDrive({size: 15})}</>
          
        },
        {
          label: "Preference",
          path: "preferences",
          icon: <>{MdIcons.MdOutlineAssignmentInd({size: 15})}</>
          
        }
      ]
      
    },

  ]


  
  export default sidear_link;



  