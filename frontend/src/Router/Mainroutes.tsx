import React, { Component } from 'react'
import { useRoutes } from 'react-router-dom';
import MainScreeen, { Home } from '../public/public-mini-component/MainPublicLayout';
import Login from '../public/login/main/Login';
import UserRegistration from '../public/registerationn/UserRegistration';

interface Route {
    path: string;
    element: React.ReactElement;
}

interface RouteWithChildren {
    element: React.ReactElement;
    children: Route[];
}

const Mainroutes = () => {
  const routes: (Route | RouteWithChildren)[] = [
    // { path: '/',  element: <Home /> },
    { path: '/',  element: <Login /> }, 
    { path: 'register',  element: <UserRegistration /> }, 
  ]

  return useRoutes(routes)
}

export default Mainroutes