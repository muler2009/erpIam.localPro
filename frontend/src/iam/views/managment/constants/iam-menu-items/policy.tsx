import SelectResourceForPolicyCreation from "../../policy/policy-mini-component/SelectResourceForPolicyCreation"
import * as Fa6Icons from 'react-icons/fa6'
import * as FaIcons from 'react-icons/fa'

import * as IoIoIcons from 'react-icons/io'
import * as MdIcons from 'react-icons/md'
import { 
  ViewChangePermissionComponent, 
  ViewGetPermissionComponent, 
  ViewPostPermissionComponent,
  ViewRemovePermissionComponent 
} from "../../policy/policy-permisssion-component"




export const new_policy_tab_attribute = [
    { 
        label: "Visual / GUI",
        total: true,
        tabContent: <SelectResourceForPolicyCreation />,
      },
      { 
        label: "JSON",
        tabContent: <h1>TabCOntent2</h1>,
        total: false
      }

]

export const policy_condition = [
  {
    label: "Allowed Action",
   
  },
  {
    label: "View"
  },
]




export const accecc_level = [
  {
    label: "Access Level",
    path: ".",
    icon: <FaIcons.FaGoogleDrive />,
    children: [
      {
        label: "View",
        content: <ViewGetPermissionComponent />
      },
      {
        label: "Add",
        content: <ViewPostPermissionComponent />
      },
      {
        label: "Change",
        content: <ViewChangePermissionComponent />
      },
      {
        label: "Remove",
        content: <ViewRemovePermissionComponent />
      },      
    ]
  },
  {
    label: "Resource Level",
    path: ".",
    icon: <FaIcons.FaGoogleDrive />,
  }
  
 
];
