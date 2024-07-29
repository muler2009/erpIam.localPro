import React, {useEffect} from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { group, access, isAuthenticated, setGroup } from '../../iam/api/auth' 
import { useGetUserGroupQuery } from '../../iam/auth/login/loginAPI';


interface UserRoles {
    role: string;
}

const RequireAuth = () => {
  const accessToken = useSelector(access);
  const isAuth = useSelector(isAuthenticated);
  const userGroup = useSelector(group);
  const location = useLocation();

  if (!accessToken || !isAuth) {
    // Redirect to login if not authenticated
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Determine the default route based on user group
  const defaultRoute = userGroup === 'admin' ? '/iam' : '/dms';

  // If the user is trying to access the root path, redirect to their default dashboard
  if (location.pathname === '/') {
    return <Navigate to={defaultRoute} replace />;
  }

  // Allow access to child routes
  return <Outlet />;
};

export default RequireAuth;



// (
//     <Outlet />
// ) : (
//     <Navigate to="/" state={{from: location}} replace />
// )




// const { data, isSuccess } = useGetUserGroupQuery(undefined, {
//     skip: !accessToken,
//   });

//   useEffect(() => {
//     if (isSuccess && data) {
//       dispatch(setGroup({ groups: data.groups }));
//     }
//   }, [isSuccess, data, dispatch]);

//   if (!accessToken) {
//     return <Navigate to="/" />;
//   }

//   if (!isSuccess) {
//     return <div>Loading...</div>; // Optional: Show loading indicator while fetching user groups
//   }

//   const defaultRoute = groupss.includes('admin') ? '/iam' : '/';
//   return <Navigate to={defaultRoute} />;