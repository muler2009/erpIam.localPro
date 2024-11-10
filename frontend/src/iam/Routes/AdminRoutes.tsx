import React, { Component } from 'react'
import { useRoutes } from 'react-router-dom';
// import Dashboard from '../layout/Dashboard';
import UserLayout from '../views/managment/user/userLayout/UserLayout';
import Dashboard from '../views/dashboard/views/Dashboard';
import GroupDashboard from '../views/managment/groups/groupviews/GroupDashboard';
import RoleDashboard from '../views/managment/roles/views/RoleDashboard';
import UserDashboard from '../views/managment/user/views/UserDashboard';
import PolicyDashboard from '../views/managment/policy/PolicyDashboard';
import GetAllPoliciesComponent from '../views/managment/policy/policy-mini-component/GetAllPoliciesComponent';
import NewPolicyComponent from '../views/managment/policy/policy-mini-component/NewPolicyComponent';
import NewPermissionCreationOnResourceComponent from '../views/managment/policy/policy-mini-component/NewPermissionCreationOnResourceComponent';
import PolicyMain from '../views/managment/policy/policy-mini-component/PolicyMain';
import NotificationSettingMain from '../views/managment/setting/main/NotificationSettingMain';

interface Route {
    path: string;
    element: React.ReactElement;
    children?: Route[]
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
        { path: '',  element: <PolicyMain /> },
        { 
          path: 'create_policy', 
          element: <NewPolicyComponent />,
          children: [
            { path: 'just',  element: <NewPermissionCreationOnResourceComponent /> },
          ]
         },
      ] 
    },
    { path: 'notification-setting',  element: <NotificationSettingMain /> },

  ]

  return useRoutes(routes)
}

export default AdminRoutes
