import React from 'react'
import * as FaIcons from 'react-icons/fa'
import { NavigationMenuProps } from '../../../models/common-models'
import { PiFolderSimplePlusFill } from "react-icons/pi";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import { FolderTabMenuInterface } from '../../models/folder-models';
import RequestList from '../../views/requests/request-mini-components/RequestList';
import GetApprovedRequest from '../../views/requests/request-mini-components/GetApprovedRequest';
import GetRequestsForApproval from '../../views/requests/request-mini-components/GetRequestsForApproval';
import { RequestTabMenuInterface } from '../../models/request-model';
import { useGetRequestsRecivedForApprovalQuery } from '../../services/requestAPISlice';

export const requestMenu: NavigationMenuProps[] = [
    {
        label: "Create request",
        // icon: <FaIcons.FaPlus />,
        miniWindow: true,
    },
    {
        label: "Create Doc",
        // icon: <FaIcons.FaPlus />,
        path: "test_request",
        miniWindow: false,
    }
]


export const request_tab_menu: RequestTabMenuInterface[] = [
    { 
        label: "Received",
        tabContent: <GetRequestsForApproval />,
        notification: 0,
        total: true
    },
    { 
      label: "Pending",
      tabContent: <RequestList /> ,
      notification: 0,
      total: true
    },
    { 
        label: "Approved",
        tabContent: <GetApprovedRequest />,
        notification: 0,
        total: true
      },
] 

export const request_menu = [
    { 
        label: "Received",
        path: ""
    },
    { 
      label: "Pending",
      path: "path2"
    },
    { 
        label: "Approved",
        path: "path3"
    },
]

