import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { refresh, access, isAuthenticated } from '../../api/auth' 

interface UserRoles {
    role: string;
}

const RequireAuth = () => {
  const accessToken = useSelector(access)
  const isAuth = useSelector(isAuthenticated)
  const location = useLocation()
 
  let user = '';

  return (
     accessToken && isAuth
        ? (
            <Outlet />
        ) : (
            user ? (
                <Navigate to="/Unauthorized" state={{from: location}} replace />
            ) :( 
                <Navigate to="/" state={{from: location}} replace />
            )
        )    
    )
}




export default RequireAuth



