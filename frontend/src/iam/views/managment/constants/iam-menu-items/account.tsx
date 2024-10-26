
import { UserDropDownDef, UserTabNavigationDef } from "../../../../models/management.model";
import * as RiIcons from "react-icons/ri";
import * as IoIcons from "react-icons/io";
import * as GrIcons from "react-icons/gr";
import * as MdIcons from "react-icons/md";
import * as CiIcons from 'react-icons/ci'


import GetAlLUserListComponent from "../../user/views/GetAllUserListComponent";
import { data } from "../../../../constants/columns";
import { UserActionMenuItemsProps, UserDashboardProps } from "../../../../models/user.model";
import { CommonMenuItemsProps } from "../../../../models/role.models";

export const userTabLink: UserTabNavigationDef[] = [
    { 
      label: "All",
      tabContent: <GetAlLUserListComponent />,
      totalValues: data.length,
      total: true
    },
    { 
      tabContent: <h1>Test</h1>,
      label: "Deactivated account",
      total: true
    },  
    { 
        label: "Expired account",
        tabContent: <h1>Expired acccount</h1>,
        total: true
    }  
] 

export const userManagemenu: UserDashboardProps[] = [
  {
    label: "Actions",
    icon: <IoIcons.IoIosAdd size={18}/>,
   
    dropdownItems: [
      { label: "New identity"},
      { label: "Action 2"  },
      // Add more dropdown items as needed
    ]
  },
  {
    label: "Notifications",
    icon: <IoIcons.IoIosAdd size={18}/>,
   
  },
];

export const identityProps: UserDashboardProps[] = [
  {
    label: "User",
    icon : <IoIcons.IoIosAdd size={18}/>,
    abbrevation: "SingleNewID",
   
  },
  {
    label: "Multiple User",
    icon : <IoIcons.IoIosAdd size={18}/>,
    abbrevation: "MultiNewID",
   
  },
  {
    label: "Notifications",
    icon: <IoIcons.IoIosAdd size={18}/>,
    abbrevation: "Not",
   
  },
];

export const userActionItems: UserActionMenuItemsProps[] = [
  {
    abbrevation: "deactivate",
    label: "Deactivate/Activate Account",
    icon:  <MdIcons.MdOutlineAirplanemodeActive size={17} />
  },
  {
    label: "Rename",
    abbrevation: "rename",
    icon: <CiIcons.CiEdit size={17} />
  },
  {
    label: "Delete",
    abbrevation: "delete",
    icon:  <CiIcons.CiTrash size={17} />
  },
]

export const userDropDown: UserDropDownDef[] = [
  {
    label: "New user",
    icon: <IoIcons.IoIosAdd size={18}/>
  },
  {
    label: "New Group",
    icon: <IoIcons.IoIosAdd size={18}/>
  },
  {
    label: "Action",
    icon: <GrIcons.GrActions size={15}/>
  }
]
