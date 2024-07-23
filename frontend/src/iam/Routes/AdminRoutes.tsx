import React, { Component } from 'react'
import { useRoutes } from 'react-router-dom';
// import Dashboard from '../layout/Dashboard';
import UserLayout from '../submodules/managment/user/userLayout/UserLayout';
import PermissionLayout from '../submodules/managment/permissions/PermissionLayout';
import Dashboard from '../submodules/dashboard/Dashboard';
import GroupDashboard from '../submodules/managment/groups/groupviews/GroupDashboard';

interface Route {
    path: string;
    element: React.ReactElement;
}

interface RouteWithChildren {
    element: React.ReactElement;
    children: Route[];
}

const AdminRoutes = () => {
  const routes: (Route | RouteWithChildren)[] = [
    { path: '/',  element: <Dashboard /> },
    { path: 'users',  element: <UserLayout /> },
    { path: 'groups',  element: <GroupDashboard /> },
    { path: 'perm_management',  element: <PermissionLayout /> },
  ]

  return useRoutes(routes)
}

export default AdminRoutes
