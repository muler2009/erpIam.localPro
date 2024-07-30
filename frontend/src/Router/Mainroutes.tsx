import React, { Component } from 'react'
import { useRoutes } from 'react-router-dom';
import MainScreeen, { Home } from '../public/login/MainScreeen';
import Login from '../public/login/Login';

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
    { path: '/',  element: <Home /> },
    { path: 'login',  element: <Login /> }, 
  ]

  return useRoutes(routes)
}

export default Mainroutes