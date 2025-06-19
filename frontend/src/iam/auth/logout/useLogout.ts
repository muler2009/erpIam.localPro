import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LogoutArgs, useUserLogoutMutation } from './logoutAPI'
import { clearAuthData, access, refresh, isAuthenticated } from '../../api/auth'

const useLogout = () => {

  const dispatch = useDispatch();
  const [ userLogout ] = useUserLogoutMutation();
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>("");
  
  const [logoutData, setLogoutData] = useState<LogoutArgs>({
    refreshToken: localStorage.getItem("refresh") ?? "",
  });

  const onUserLogoutClicked = async() => {
    try{
        await userLogout(logoutData)
        dispatch(clearAuthData({
          access,
          refresh,
          isAuthenticated
        }))
        // localStorage.removeItem('role')
        navigate('/')
    }catch(error){
      console.log("error occired")
    }
  }

  return {
    onUserLogoutClicked
  }
}

export default useLogout

