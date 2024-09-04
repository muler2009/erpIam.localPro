import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import { Layout } from '../layout/Layout'
import Login from '../public/login/Login'
import Dashboard from '../iam/layout/Dashboard'
import RequireAuth from '../components/auth/RequiredAuth'
import DMSDashboard from '../dms/layout/DMSDashboard'
import MainScreeen from '../public/login/MainScreeen'
import DMSMainLayout from '../dms/layout/DMSMainLayout'

const Router = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route element={<Layout />} errorElement={<h1>Erroe Message</h1>}>
                <Route path='/*' element={<MainScreeen />} />
                <Route element={<RequireAuth />}  >
                    <Route path="iam/*" element={<Dashboard />} />
                    <Route path="dms/*" element={<DMSMainLayout />} />
                </Route>
            </Route>
        )
    )
    return router
}

export default Router
