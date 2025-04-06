import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import { Layout } from '../layout/Layout'
import Login from '../public/login/main/Login'
import Dashboard from '../iam/layout/Dashboard'
import RequireAuth from '../components/auth/RequiredAuth'
import DMSDashboard from '../app/layout/DMSDashboard'
import MainScreeen from '../public/public-mini-component/MainPublicLayout'
import DMSMainLayout from '../app/layout/DMSMainLayout'
import DMSReuesterLayout from '../app/layout/DMSReuesterLayout'

const Router = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route element={<Layout />} errorElement={<h1>Erroe Message</h1>}>
                <Route path='/*' element={<MainScreeen />} />
                <Route element={<RequireAuth />}  >
                    <Route path="iam/*" element={<Dashboard />} />
                    <Route path="app/*" element={<DMSMainLayout />} />
                    <Route path="client/*" element={<DMSReuesterLayout />} />

                </Route>
            </Route>
        )
    )
    return router
}

export default Router
