import React, { Component } from 'react'
import { useRoutes } from 'react-router-dom';
// import Dashboard from '../layout/Dashboard';
import RoleLayout from '../submodules/managment/role/rolelayout/RoleLayout';
import UserLayout from '../submodules/managment/user/userLayout/UserLayout';
import UnderConstruction from '../components/reusable/UnderConstruction';
import PermissionLayout from '../submodules/managment/permissions/PermissionLayout';
import GroupManagementDashboard from '../submodules/managment/groups/groupviews/GroupManagementDashboard';
import TreeView from '../components/reusable/TreeView';
import menus from '../constants/data';
import { sidebarItems } from '../constants/sidebar';
import SidebarMenu from '../components/reusable/SidebarMenu';
import Dashboard from '../submodules/dashboard/Dashboard';

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
    { path: 'groups',  element: <GroupManagementDashboard /> },
    { path: 'role_management',  element: <RoleLayout /> },
    { path: 'perm_management',  element: <PermissionLayout /> },


  ]

  return useRoutes(routes)
}

export default AdminRoutes
