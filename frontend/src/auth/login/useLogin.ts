import {ChangeEvent, useState} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LoginRequiredData } from '../../iam/models/login.model'
import { setAuthData, clearAuthData } from '../../api/auth'
import { useUserLoginMutation } from './loginAPI'



const useLogin = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userLogin] = useUserLoginMutation()


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
      const { access, refresh } = response
      // Store the access and refresh token on localstorage
      localStorage.setItem("token", access)
      localStorage.setItem("refresh", refresh)

      // const decodeRole = jwt_decode(access)
      // const role = decodeRole.role?.role_name
      // localStorage.setItem('role', role)

      // Clear existing auth data before setting new data
      dispatch(clearAuthData(
        {
          isAuthenticated: false,
          access, 
          refresh
        }
      ));
      dispatch(setAuthData(
          {
            isAuthenticated: true,
            access, 
            refresh
          }
      ));

      navigate('/iam')
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
      
    } catch (error) {
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
