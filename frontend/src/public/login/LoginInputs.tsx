import React, {useState} from 'react'
import { Input, Button } from '../../components/common'
import { FaUserAlt, FaLock } from 'react-icons/fa'
import useLogin from '../../iam/auth/login/useLogin'
import erp from '../../assets/images/erp.png'
import { LoginErrorMessageModal } from '../../iam/components/errors/LoginError'
import { ErrorResponseInterface } from '../../iam/models/error.model'
import { Div, FlexBox, FlexBoxInner, Text } from '../../components/common/StyledComponent'


const LoginInputs = () => {
  const { loginData, handleInputLoginChanges, onLoginButtonClicked, loginErrorMessage, loginFailed, setLoginFailed} = useLogin()

  return (
    <FlexBox className='h-full pt-5 pb-5 w-[75%] shadow-md'>
      <FlexBoxInner className='flex flex-col items-start h-full '>
        <Div className='px-10'>
          <Text className='text-[24px] font-IBMPlexSans font-semibold'> Login to System</Text>
          <hr className="my-5 h-[1px] border-t-0 bg-gray-100 w-full" />

        </Div>

        <div className='px-10 w-[50%] flex flex-col gap-4  h-[90%] pb-10'>
          <div className="relative font-Poppins">
            <label className='relative cursor-pointer py-2 flex flex-row items-center'>
                <input 
                  id='username'
                  type='text' 
                  name='username'
                  placeholder='username'
                  className='px-6 pt-4 text-black input-md border-opacity-50 focus:outline-none focus:border-green-600 focus:bg-inherit placeholder-gray-300 placeholder-opacity-0 transition duration-200 focus:border-inherit'  
                  value={loginData.username}
                  onChange={handleInputLoginChanges}
                />
                <FaUserAlt color="gray" className="absolute right-2 mr-3 "/>
                <span className='text-black text-[15px] bg-white text-opacity-80 absolute left-5 top-5 px-1 transition duration-200 input-text'>Username</span>
            </label>  
          </div>
          {/* Password Field */}
          <div className="relative font-Poppins">
            <label className='relative cursor-pointer py-2 flex flex-row items-center'>
                <input 
                  id='password'
                  type='password' 
                  name='password'
                  placeholder='password'
                  className='px-6 pt-4 text-black input-md border-opacity-50 focus:outline-none focus:border-green-600 focus:bg-inherit placeholder-gray-300 placeholder-opacity-0 transition duration-200 focus:border-inherit'    
                  value={loginData.password}
                  onChange={handleInputLoginChanges} 
                />
                <FaLock color="gray" className="absolute right-2 mr-3"/>
                <span className='text-black text-[15px] bg-white text-opacity-80 absolute left-5 top-5 px-1 transition duration-200 input-password'>Password</span>
            </label>  
          </div>
          <div className='flex space-x-5'>
            <Button 
                label="Login" 
                className='btn-sm bg-gray-300 font-Poppins rounded-sm px-10 hover:bg-[#00bdff] hover:text-white hover:ring-2 hover:ring-white hover:rounded-sm' 
                onClick={onLoginButtonClicked}
              />
          </div>
        </div>
      </FlexBoxInner>
        <LoginErrorMessageModal 
          loginErrorMessage={loginErrorMessage}
          loginFailed={loginFailed} 
          setLoginFailed={setLoginFailed} 
        />

    </FlexBox>
  )
}
      
         
    


export default LoginInputs

