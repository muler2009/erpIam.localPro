import React from 'react'
import { useRoutes } from 'react-router-dom'
import { MenuItemInterface } from '../components/reusable/side-tree/side-bar-interface';
import DMSDashboard from '../layout/DMSDashboard';
import menus from '../components/reusable/side-tree/menus';
import DashboardMain from '../views/dashboard/DashboardMain';
import UnderConstruction from '../../components/common/UnderConstruction';
import LibraryMain from '../views/document-management/LibraryMain';


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
        { path: 'dashboard', element: <UnderConstruction /> },
        { path: 'document/library/main', element: <LibraryMain/> },
        { path: 'document/library/upload', element: <DashboardMain/> },
    ];

    return useRoutes(dmsRoutes);
};
export default Routes