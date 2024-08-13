import React from 'react'
import { useRoutes, Outlet } from 'react-router-dom'
import { MenuItemInterface } from '../components/reusable/side-tree/side-bar-interface';
import DMSDashboard from '../layout/DMSDashboard';
import menus from '../components/reusable/side-tree/menus';
import DashboardMain from '../views/dashboard/DashboardMain2';
import UnderConstruction from '../../components/common/UnderConstruction';
import LibraryMain from '../views/document-management/LibraryMain';
import SharedMainDashboard from '../views/shared/SharedMainDashboard';
import Dashboard from '../views/dashboard/Dashboard';
import LibraryList from '../views/document-management/LibraryList';
import MainFolderLibrary from '../views/document-management/folders/MainFolderLibrary';
import RequestMainPage from '../views/requests/RequestMainPage';



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
        { path: 'library/main', element: <MainFolderLibrary />,
            children: [
                // {path: '', element: <MainFolderLibrary />},
                {path: 'create', element: <h1>Test Docuemtn</h1>},
            ]
        },
        { path: 'library/shared', element: <SharedMainDashboard/> },
        { path: 'library/upload', element: <DashboardMain/> },
        { path: 'request', element: <RequestMainPage/>,
            children: [
                {path: 'test_request', element: <h1>Test Request</h1>},
            ]


         },

    ];

    return useRoutes(dmsRoutes);
};

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