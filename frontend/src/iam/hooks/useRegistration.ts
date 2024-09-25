import React, { useState } from 'react'
import { useUserSelfRegistrationMutation } from '../features/userAPI';
import { ErrorResponseInterface } from '../models/error.model';
import { on } from 'stream';

const useRegistration = () => {

    const [userSelfRegistration, { isError, error }] = useUserSelfRegistrationMutation()

    const [loginErrorMessage, setLoginErrorMessage] = useState<ErrorResponseInterface | null>(null);
    const [loginError, setLoginError] = useState<boolean>(false);
    const [loginFailed, setLoginFailed] = useState<boolean>(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const [registeration, setRegistration] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        confirm_password: "" 
    })

    const handleRegistrationInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const { name, value} = event.target

        setRegistration(prevRegData => ({
            ...prevRegData,
            [name]: value
        }))
    }

    const clearDataOnSuccess =  () => {
        setRegistration({
            first_name: "",
            last_name: "",
            username: "",
            email: "",
            password: "",
            confirm_password: "" 
        })
    }

    const canSave = [...Object.values(registeration)].every(Boolean)
    const onRegisterEventClicked = async() => {  
        try {
          const response = await userSelfRegistration(registeration).unwrap()
          if(response.status_code === 201){
            clearDataOnSuccess()
            console.log("successful")
          }
    
        } catch (error: any) {
          setIsLoggingIn(false);
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
        registeration,
        setRegistration,
        handleRegistrationInputs,
        clearDataOnSuccess,
        canSave, 
        onRegisterEventClicked  ,
        loginErrorMessage,
        loginError,
        setLoginFailed,
        loginFailed 
    }
}

export default useRegistration