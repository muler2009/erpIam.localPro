
import React from 'react'
import * as IoIcons from "react-icons/io";
import { UserDashboardProps } from '../../../models/user.model';

export const groupsDropdown: UserDashboardProps[] = [
    {
        label: "New group",
        icon: <IoIcons.IoIosAdd size={18}/>,
        abbrevation: "NEW_GROUP"
    },
    {
        label: "Edit Group",
        icon: <IoIcons.IoIosAdd size={18}/>,
        abbrevation: "EDIT_GROUP"
    },
]


