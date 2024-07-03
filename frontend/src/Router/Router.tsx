import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import { Layout } from '../layout/Layout'
import Login from '../public/login/Login'
import Dashboard from '../iam/layout/Dashboard'
import RequireAuth from '../components/auth/RequiredAuth'

const Router = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route element={<Layout />}>
                <Route path='/' element={<Login />} />
                <Route path='/test' element={<h1 className='text-[25px] font-Oswald tracking-wide'>Test for Public Route</h1>} />
                <Route element={<RequireAuth />}>
                    <Route path="iam/*" element={<Dashboard />} />
                </Route>
            </Route>
        )
    )
    return router
}

export default Router
