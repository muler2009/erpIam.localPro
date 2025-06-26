import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import { Layout } from '../layout/Layout'
import Login from '../public/login/login-mini-component/Login'
import Dashboard from '../iam/layout/Dashboard'
import RequireAuth from '../components/auth/RequiredAuth'
import DMSDashboard from '../app/layout/DMSDashboard'
import MainScreeen from '../public/login/main/MainPublicLayout'
import DMSMainLayout from '../app/layout/DMSMainLayout'
import DMSReuesterLayout from '../app/layout/DMSReuesterLayout'
import ERPMainDashboard from '../erp/dashboard/main/ERPMainDashboard'

const Router = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route element={<Layout />} errorElement={<h1>Erroe Message</h1>}>
                <Route path='/*' element={<MainScreeen />} />
                <Route element={<RequireAuth />}  >
                    <Route path="iam/*" element={<Dashboard />} />
                    <Route path="app/*" element={<DMSMainLayout />} />
                    <Route path="client/*" element={<ERPMainDashboard />} />
                    <Route path="inventory/" element={<h1>Inventrory</h1>} />
                    <Route path="crm/" element={<h1>CRM</h1>} />
                </Route>
            </Route>
        )
    )
    return router
}

export default Router
