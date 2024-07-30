import {ChangeEvent, useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LoginRequiredData } from '../../models/login.model'
import { setAuthData, clearAuthData, setGroup, access, refresh, group } from '../../api/auth'
import { useUserLoginMutation } from './loginAPI'
import useUtils from './useUtils'
import { ErrorResponseInterface } from '../../models/error.model'

const useLogin = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userLogin, { isError, error } ] = useUserLoginMutation()
  const { routeToDashboard } = useUtils()

  const [loginData, setLoginData] = useState<LoginRequiredData>({
      username: "",
      password: "" 
  })

  const [loginErrorMessage, setLoginErrorMessage] = useState<ErrorResponseInterface | null>(null);
  const [loginError, setLoginError] = useState<boolean>(false);
  const [loginFailed, setLoginFailed] = useState<boolean>(false);


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
      const { access, refresh, username, group } = response
      console.log(group)
      // Clear existing auth data before setting new data
      dispatch(clearAuthData({ isAuthenticated: false, access, refresh, username, group}));
      dispatch(setAuthData({isAuthenticated: true, access, refresh, username, group }));
      const userRoutePath = routeToDashboard(group) 
      navigate(userRoutePath)

    } catch (error: any) {
        if (!error) {
          console.log(error);
        } else if (error.data.status_code === 401) {
          setLoginErrorMessage({
            error_type: error.data?.error_type,
            message: error.data?.message,
            status_code: error.status_code
          });
          setLoginError(true);
          setLoginFailed(prev => !prev);
        } else if (error.status === 403) {
          setLoginErrorMessage({
            error_type: error.data?.error_type,
            message: error.data?.message,
            status_code: error.status_code
          });
          setLoginError(true);
          setLoginFailed(prev => !prev);
        } else {
          setLoginErrorMessage({
            error_type: error.response?.data?.error_type || "Unknown Error",
            message: error.response?.data?.message || "An error occurred. Please try again.",
            status_code: error.status
          });
          setLoginError(true);
          setLoginFailed(prev => !prev);
        }
      }
  };

  return {
    loginData,
    setLoginData,
    handleInputLoginChanges,
    onLoginButtonClicked,
    isError,
    error,
    loginError,
    loginErrorMessage,
    loginFailed,
    setLoginFailed
  }
}

export default useLogin
