import {ChangeEvent, useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LoginRequiredData } from '../../models/login.model'
import { setAuthData, clearAuthData, setGroup, access, refresh, group } from '../../api/auth'
import { useUserLoginMutation } from './loginAPI'
import { useGetUserGroupQuery } from './loginAPI'
import useUtils from './useUtils'




const useLogin = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userLogin] = useUserLoginMutation()

  const {getGroupBasedDashboardPath} = useUtils()

  const [loginData, setLoginData] = useState<LoginRequiredData>({
      username: "",
      password: "" 
  })

  const handleInputLoginChanges = (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault()
      const { type, name, value,  checked } = event.target
      const inputValue = type === 'checkbox' ? checked : value
      setLoginData({
        ...loginData, 
        [name] : inputValue
      })
  }

      // Function the handles when the login button clicked
  const onLoginButtonClicked = async() => {
        
    try {
      const response = await userLogin(loginData).unwrap()
      // destructure the access and refresh token
      const { access, refresh, user, group } = response
      console.log(group)

      // Clear existing auth data before setting new data
      dispatch(clearAuthData({ isAuthenticated: false, access, refresh, user, group}));
      dispatch(setAuthData({isAuthenticated: true, access, refresh, user, group }));
      
      const userRoutePath = getGroupBasedDashboardPath(group)
      navigate(userRoutePath)
     

    } catch (error) {
     
      console.log(error)
    }
  };

  return {
    loginData,
    setLoginData,
    handleInputLoginChanges,
    onLoginButtonClicked
  }
}

export default useLogin



  // Store the access and refresh token on localstorage
      // localStorage.setItem("token", access)
      // localStorage.setItem("refresh", refresh)

      // const decodeRole = jwt_decode(access)
      // const role = decodeRole.role?.role_name
      // localStorage.setItem('role', role)

 //dispatch(setRole(role));
      
      // if (role === 'manager' || role === 'Staff'){
      //     navigate('/manager')
      // } else if (role === 'user'){
      //     navigate('/index')
      // }  else if (role === 'erp'){
      //     navigate('/erp')
      // } 
      // else {
      //     navigate('admin')
      // }

 // if (!error) {
      //     console.log(error);
      // } else if (error.status === 400) {
      //     setLoginErrorMessage(error.response?.data?.error || "Please fill in the username and password");
      //     setLoginError(true);
      //     setLoginFailedModal((prev) => !prev);
      // } else if (error.status === 401) {
      //     setLoginErrorMessage(error?.data?.detail );
      //     setLoginError(true);
      //     setLoginFailedModal((prev) => !prev);
      // }