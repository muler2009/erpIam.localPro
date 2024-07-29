import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import { Layout } from '../layout/Layout'
import Login from '../public/login/Login'
import Dashboard from '../iam/layout/Dashboard'
import RequireAuth from '../components/auth/RequiredAuth'
import DMSDashboard from '../dms/layout/DMSDashboard'

const Router = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route element={<Layout />}>
                <Route path='/' element={<Login />} />
                <Route element={<RequireAuth />}>
                    <Route path="iam/*" element={<Dashboard />} />
                    <Route path="dms/*" element={<DMSDashboard />} />
                </Route>
            </Route>
        )
    )
    return router
}

export default Router
