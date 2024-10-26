import { CommonMenuItemsProps } from "../../../../models/role.models"
import * as RiIcons from "react-icons/ri";
import { LiaDownloadSolid } from "react-icons/lia";
import { IoIosRefresh } from "react-icons/io";
import UserList from "../../user/views/GetAllUserListComponent";
import QuickAccessRole from "../../roles/mini-components/QuickAccessRole";

export const roles: CommonMenuItemsProps[] = [
    {
        label: 'Add',
        icon: <RiIcons.RiAddLine />,
        link_identifier: 'add'
    },
    {
        label: 'Download role assignment',
        icon: <LiaDownloadSolid/>,
        link_identifier: 'download'
    },
    {
        label: 'Refresh',
        icon: <IoIosRefresh />,
        link_identifier: 'refresh'
    },
    {
        label: 'Remove',
        icon: <RiIcons.RiCloseLargeFill />,
        link_identifier: 'remove'
    }
]


export const role_tab: CommonMenuItemsProps[] = [
    { 
        label: "All",
        total: true,
        tabContent: <QuickAccessRole />,
      },
      { 
        label: "Role assignment",
        tabContent: <h1>TabCOntent2</h1>,
        total: false
      },
      { 
        label: "Deprecated Roles",
        tabContent: <h1>TabCOntent3s</h1>,
        total: false
      }  


]
