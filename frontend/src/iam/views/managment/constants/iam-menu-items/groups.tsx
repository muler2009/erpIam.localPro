
import React from 'react'
import * as IoIcons from "react-icons/io";
import { UserDashboardProps } from '../../../../models/user.model';

export const groupsDropdown: UserDashboardProps[] = [
    {
        label: "Create group",
        icon: <>{IoIcons.IoIosAdd({size: 18})}</>,
        abbrevation: "NEW_GROUP"
    },
    {
        label: "Edit group",
        icon: <>{IoIcons.IoIosAdd({size: 18})}</>,
        abbrevation: "EDIT_GROUP"
    },
]


