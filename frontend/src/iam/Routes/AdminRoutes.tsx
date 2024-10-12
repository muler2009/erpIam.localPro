import React, { Component } from 'react'
import { useRoutes } from 'react-router-dom';
// import Dashboard from '../layout/Dashboard';
import UserLayout from '../views/managment/user/userLayout/UserLayout';
import PermissionLayout from '../views/managment/permissions/PermissionLayout';
import Dashboard from '../views/dashboard-view/Dashboard';
import GroupDashboard from '../views/managment/groups/groupviews/GroupDashboard';
import RoleDashboard from '../views/managment/roles/views/RoleDashboard';
import UserDashboard from '../views/managment/user/views/UserDashboard';
import PolicyDashboard from '../views/managment/policy/PolicyDashboard';
import GetAllPoliciesComponent from '../views/managment/policy/policy-mini-component/GetAllPoliciesComponent';

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
    { path: 'users',  element: <UserDashboard /> },
    { path: 'groups',  element: <GroupDashboard /> },
    { path: 'roles',  element: <RoleDashboard /> },
    { 
      path: 'policies',  element: <PolicyDashboard />,
      children: [
        { path: '',  element: <GetAllPoliciesComponent /> },
        { path: 'create_policy',  element: <h1>New Policy</h1> },

      ] 
    },

  ]

  return useRoutes(routes)
}

export default AdminRoutes
