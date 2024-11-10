import React from 'react'
import { useRoutes, Outlet } from 'react-router-dom'
import { MenuItemInterface } from '../components/reusable/side-tree/side-bar-interface';
import DMSDashboard from '../layout/DMSDashboard';
import menus from '../components/reusable/side-tree/menus';

import UnderConstruction from '../../components/common/UnderConstruction';
import LibraryMain from '../views/document-management/LibraryMain';
import SharedMainDashboard from '../views/shared/SharedMainDashboard';
import Dashboard from '../views/dashboard/Dashboard';
import LibraryList from '../views/document-management/LibraryList';
import RequestMainPage from '../views/requests/RequestMainPage';
import RequestDashboard from '../views/requests/request-mini-components/RequestDashboard';
import AllFileandFolderView from '../views/document-management/folders/folder-mini-reusable-components/AllFileandFolderView';
import RequestSent from '../views/requests/request-mini-components/RequestSent';
import ClientDashboard from '../views/requests/client-mini-components/ClientDashboard';
import ClientPendingRequest from '../views/requests/client-mini-components/ClientPendingRequest';
import ClientApproved from '../views/requests/client-mini-components/ClientApproved';
import GetAllDocument from '../views/files-view/GetAllDocument';
import AllFilesOnly from '../views/document-management/folders/folder-mini-reusable-components/AllFilesOnly';
import DelegationDashboardComponent from '../views/delegation/DelegationDashboardComponent';
import DelegationDashboardContent from '../views/delegation/delegation-mini-component/DelegationDashboardContent';
import NotificationTabNavigation from '../views/notification/notification-sub-component/NotificationTabNavigation';
import NotificationDashboard from '../views/notification/NotificationDashboard';
import NotificationReadActionComponent from '../constants/columns/notification-column-action-component/NotificationReadActionComponent';
import { NotificationListComponent } from '../views/notification/notification-sub-component';
import PreferencesDashboardComponent from '../views/preferences/main/PreferencesDashboardComponent';



interface Route {
    path: string;
    element: React.ReactElement;
}

interface RouteWithChildren {
    element: React.ReactElement;
    children: Route[];
}

const Routes = () => {
    const dmsRoutes: (Route | RouteWithChildren)[] = [
        { path: '/', element: <Dashboard /> },
        { path: 'library/main', element: <AllFileandFolderView />,
            children: [
                // {path: '', element: <MainFolderLibrary />},
                { path: 'create', element: <h1>Test Docuemtn</h1> },
            ]
        },
        { path: 'library/files', element: <AllFilesOnly/> },
        { path: 'library/shared', element: <SharedMainDashboard/> },

        { path: 'library/archvied', element: <GetAllDocument /> },
       
        { path: 'request', element: <RequestMainPage/>,
            children: [
                { path: '', element: <RequestDashboard /> },
                { path: 'test_request', element: <h1>Test Request</h1> },
            ]
        },
        { path: 'delegation', element: <DelegationDashboardComponent />,
            children: [ 
                { path: '', element: <DelegationDashboardContent /> },
                { path: 'me', element: <h1>Test Request</h1> },
                { path: 'me2', element: <h1>Second Delegations</h1> },

            ]
         },
        { path: 'requested-sent', element: <RequestSent /> },
        { path: 'client', element: <RequestSent /> },


        { path: 'notification', element: <NotificationDashboard />,
            children: [
                { path: 'somehwere', element: <h1>detail</h1> } 
            ]
         },

         { path: 'preferences', element: <PreferencesDashboardComponent /> },

    ];

    return useRoutes(dmsRoutes);
};



export const ClientRoutesConf = () => {
    const clientRoutes: (Route | RouteWithChildren)[] = [
        { path: '/', element: <ClientDashboard /> },
        { path: '_approved', element: <ClientApproved /> },

        { path: '_pending', element: <ClientPendingRequest /> },

    ];

    return useRoutes(clientRoutes)
}









export const DocumentRoutes = () => {
    const routes: (Route | RouteWithChildren)[] = [
        {  
            element: <LibraryMain/>,
            children: [
                {path: 'document/library/main', element: <LibraryList />}
            ]
        },
    ];

    return useRoutes(routes)
}


export default Routes