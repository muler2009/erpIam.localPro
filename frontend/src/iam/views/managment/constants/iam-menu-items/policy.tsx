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
import GetAllPoliciesComponent from "../../policy/policy-mini-component/GetAllPoliciesComponent"
import ViewModelLevelComponent from "../../policy/policy-permisssion-component/ViewModelLevelComponent"
import GetAllModelLevelPolicies from "../../policy/policy-mini-component/GetAllModelLevelPolicies"
import GetAllApplicationLevelPoliciesComponent from "../../policy/policy-mini-component/GetAllApplicationLevelPoliciesComponent"




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


export const policy_type_tab_menu = [
  { 
      label: "All",
      total: true,
      tabContent: <GetAllPoliciesComponent />,
    },
    { 
      label: "Model level",
      tabContent: <GetAllModelLevelPolicies />,
      total: true
    },
    { 
      label: "App level",
      tabContent: <GetAllApplicationLevelPoliciesComponent />,
      total: true
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




export const app_level_access = [
  {
    label: "Access Level",
    path: ".",
    icon: <FaIcons.FaGoogleDrive />,
    children: [
      {
        label: "View",
        content: <ViewGetPermissionComponent />,
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


export const model_level_access = [
  {
    label: "Access Level",
    path: ".",
    icon: <FaIcons.FaGoogleDrive />,
    children: [
      {
        label: "View",
        content: <ViewModelLevelComponent />,
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
