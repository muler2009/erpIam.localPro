import React from 'react'
import { useRoutes } from 'react-router-dom'
import { MenuItemInterface } from '../components/reusable/side-tree/side-bar-interface';
import DMSDashboard from '../layout/DMSDashboard';
import menus from '../components/reusable/side-tree/menus';


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
        { path: '/dms', element: <DMSDashboard /> },
        { path: 'dashboard', element: <h1>Test code </h1> },
        { path: 'activities', element: <h1>Activities </h1> },
    ];

    return useRoutes(dmsRoutes);
};
export default Routes