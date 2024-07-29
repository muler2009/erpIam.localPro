import React from 'react'
import useLogin from '../../iam/auth/login/useLogin'
import { useDispatch, useSelector } from 'react-redux'
import { access, group, refresh } from '../../iam/api/auth'
import { useGetUserGroupQuery } from '../../iam/auth/login/loginAPI'



const LoginAuthRoute = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector(access)
  const groups = useSelector(group)

  const { loginData, handleInputLoginChanges, onLoginButtonClicked } = useLogin()
  const { data, isSuccess} = useGetUserGroupQuery(undefined, {
    skip: !accessToken,
  })


  

  return (
    <div>LoginAuth</div>
  )
}

export default LoginAuthRoute