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
        icon: <FaIcons.FaPlus />,
        miniWindow: true,
    },
    {
        label: "Create Doc",
        icon: <FaIcons.FaPlus />,
        path: "test_request",
        miniWindow: false,
    }
]


export const request_tab_menu: RequestTabMenuInterface[] = [
    { 
      label: "All",
      tabContent: <RequestList /> ,
      notification: 0,
      total: true
    },
    { 
        label: "Request Received",
        tabContent: <GetRequestsForApproval />,
        notification: 0,
        total: true
    },
    { 
        label: "Approved",
        tabContent: <GetApprovedRequest />,
        notification: 0,
        total: true
      },
      { 
        label: "Pending for approvals",
        tabContent: <h1>Pending approvals</h1>,
        notification: 0,
        total: true
      },
      { 
        label: "Rejected",
        tabContent: <h1>Rejected</h1>,
        notification: 0,
        total: true
      }
] 