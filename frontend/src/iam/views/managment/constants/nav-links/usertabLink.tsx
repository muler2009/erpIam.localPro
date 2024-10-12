
import { UserDropDownDef, UserTabNavigationDef } from "../../../../models/management.model";
import * as RiIcons from "react-icons/ri";
import * as IoIcons from "react-icons/io";
import * as GrIcons from "react-icons/gr";
import UserList from "../../user/views/UserList";
import { data } from "../../../../constants/columns";
import { UserDashboardProps } from "../../../../models/user.model";

export const userTabLink: UserTabNavigationDef[] = [
    { 
      label: "Available Users",
      tabContent: <UserList />,
      totalValues: data.length,
      total: true
    },
    { 
      tabContent: <h1>Test</h1>,
      label: "Trash",
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
