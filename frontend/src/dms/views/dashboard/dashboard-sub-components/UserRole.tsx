import React from 'react'
import {jwtDecode, JwtPayload} from 'jwt-decode';
import {access} from '../../../../iam/api/auth'
import { useSelector } from 'react-redux'

// Define a custom interface extending JwtPayload
interface CustomJwtPayload extends JwtPayload {
    roles: string[]; // Assuming roles is an array of strings
}


const UserRole = () => {
    const accessToken = useSelector(access)
    let roles: string[] = [];

    if (accessToken) {
        const decodedToken = jwtDecode<CustomJwtPayload>(accessToken);
        roles = decodedToken.roles || []; // Extract roles from the token payload
    }

  return (
    <div>
        {
            roles?.map((role: any, index: any) => {
                return(
                    <div className='' key={index}>
                        {role}
                    </div>
                )
            })
        }
    </div>
  )
}

export default UserRole