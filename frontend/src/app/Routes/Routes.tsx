import React from 'react'
import { useRoutes, Outlet } from 'react-router-dom'
import {
    UnderConstruction,
    LibraryList,
    LibraryMain,
    SharedMainDashboard,
    Dashboard,
    RequestDashboard,
    AllFileandFolderView,
    RequestSent,
    ClientDashboard,
    ClientApproved,
    ClientPendingRequest,
    GetAllDocument,
    AllFilesOnly,
    DelegationDashboardComponent,
    DelegationDashboardContent,
    NotificationDashboard,
    PreferencesDashboardComponent,
    WorkflowDashboard
} from '.'

import RequestMainPage from '../views/requests/workflow-main/RequestMainPage';
import GetRequestsForApproval from '../views/requests/request-mini-components/GetRequestsForApproval';



interface Route {
    path: string;
    element?: React.ReactElement;
    children?: Route[]
}

interface RouteWithChildren {
    element?: React.ReactElement;
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
                { path: '', element: <GetRequestsForApproval /> },
                { path: 'path2', element: <h1>Second Delegations</h1> },
                { path: 'path3', element: <h1>Second Delegations</h1> },
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

         { path: 'preferences', element: <PreferencesDashboardComponent />,
            children: [
                { path: 'preferences', element: <h1>Initial</h1> } ,
                { path: 'setup', element: <h1>detail</h1> } 
            ]
          },

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