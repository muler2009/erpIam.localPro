import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useUserLogoutMutation } from './logoutAPI'
import { clearAuthData, access, refresh, isAuthenticated } from '../../api/auth'

const useLogout = () => {

  const dispatch = useDispatch();
  const [ userLogout ] = useUserLogoutMutation();
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>("");

  const onUserLogoutClicked = async() => {
    try{
        await userLogout({refresh})

        dispatch(clearAuthData({
          access,
          refresh,
          isAuthenticated
        }))
        // localStorage.removeItem('role')
        navigate('/')
    }catch(error){
      console.log("error occired")
        // console.log(error.message)
        // setError(error.message);
    }
  }

  return {
    onUserLogoutClicked
  }
}

export default useLogout

