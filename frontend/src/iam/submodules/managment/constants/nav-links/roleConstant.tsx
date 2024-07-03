import { FaUsb } from "react-icons/fa";
import { RoleDropDownDef, RoleTabNavigation } from "../../../../models/management.model";
import RoleList from "../../role/views/RoleList";
import * as IoIcons from "react-icons/io5";

export const roleTabLink: RoleTabNavigation[] = [
  { 
    icon: <FaUsb size={18} />,
    tabContent: <RoleList /> ,
    description: "Available",
    label: "Available Roles",
    total: true
  },
  { 
    icon: <IoIcons.IoTrashOutline size={18} />,
    tabContent: <h1>Trash</h1> ,
    description: "Create",
    label: "Trash"
  }, 
] 


export const roleDropDown: RoleDropDownDef[] = [
    {
        label: "Create Role",
    },
    {
        label: "Show Action",
    }
]