import { FaLayerGroup } from "react-icons/fa";
import * as MdIcons from 'react-icons/md'
// import {  AssignUserToGroup } from "../../user/views";
import AssignUserToGroup from "../../user/views/AssignUserToGroup"
import AssignPolicyToNewUser from "../../user/views/AssignPolicyToNewUser"

export interface TabItem {
    label: string;
    icon?: React.ReactElement,
    tabContent: JSX.Element;
}

export const user_add: TabItem[] = [
    { 
        label: "Group",
        icon: <>{MdIcons.MdGroups({size: 25})}</>,
        tabContent: <AssignUserToGroup />,
      },
      { 
        label: "Attach Policy",
        icon: <>{MdIcons.MdPolicy({size: 25})}</>,
        tabContent: <AssignPolicyToNewUser />,
      }  

]
