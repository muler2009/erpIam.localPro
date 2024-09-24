import React, {useState} from 'react'
import { Input, Button } from '../../components/common'
import { FaUserAlt, FaLock } from 'react-icons/fa'
import useLogin from '../../iam/auth/login/useLogin'
import erp from '../../assets/images/erp.png'
import { LoginErrorMessageModal } from '../../iam/components/errors/LoginError'
import { ErrorResponseInterface } from '../../iam/models/error.model'
import { Div, FlexBox, FlexBoxInner, Text } from '../../components/common/StyledComponent'
import LoginInstruction from './LoginInstruction'
import logo_2 from '../../assets/images/logo_2.png'


const LoginInputs = () => {
  const { loginData, handleInputLoginChanges, onLoginButtonClicked, isLoggingIn, setIsLoggingIn, loginErrorMessage, loginFailed, setLoginFailed} = useLogin()
 
  return (
    <FlexBox className={`h-full py-5 ${isLoggingIn && 'login-animate'}`}>
      <FlexBoxInner className='flex space-x-[2px] h-full'>
        {/* <LoginInstruction /> */}
        <FlexBoxInner className='flex flex-col items-center w-[80%] mx-auto border pt-16 bg-white bg-opacity-65 rounded-md'>
          <FlexBoxInner className='flex flex-col justify-center items-center'>
            <Div className='font-IBMPlexSans font-semibold text-primary-green flex space-x-3 justify-start items px-10'>
                <img src={logo_2} className='w-[7rem] h-[7rem] object-cover' alt='Oromia land administration' />
                <Div className='pt-2 whitespace-nowrap'>
                    <Text className='font-Poppins text-[25px] font-semibold text-[#5e2f05] text-opacity-80'>Biiroo Lafa Oromiyaa
                      <span className='font-Poppins font-semibold block -pt-2 text-[17px] text-primary-green text-opacity-70'>Oromia Land Bureau</span>
                       <span className='font-Poppins font-semibold block -pt-2 text-[15px] text-text-primary text-opacity-50'>
                        Electronic Document Management system (e-DMS)
                       </span>
                    </Text>
                </Div>

              </Div>
                <hr className="my-5 h-[1px] border-t-0 bg-gray-100 w-full" />
          </FlexBoxInner>
          
        
            <div className={`px-10 flex flex-col justify-center gap-4 w-[80%] mx-auto`}>
              <Text className='text-[30px] font-Poppins text-[#5e2f05] font-semibold text-center text-opacity-65'> Login to System</Text>
                <div className="relative font-Poppins">
                  <label className='relative cursor-pointer py-2 flex flex-row items-center'>
                      <input 
                        id='username'
                        type='text' 
                        name='username'
                        placeholder='username'
                        className='px-6 pt-4 text-black input-md border-opacity-50 focus:outline-none focus:border-green-600 focus:bg-white placeholder-gray-300 placeholder-opacity-0 transition duration-200 focus:border-inherit'  
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
                        className='px-6 pt-4 text-black input-md border-opacity-50 focus:outline-none focus:border-green-600 focus:bg-white placeholder-gray-300 placeholder-opacity-0 transition duration-200 focus:border-inherit'    
                        value={loginData.password}
                        onChange={handleInputLoginChanges} 
                      />
                      <FaLock color="gray" className="absolute right-2 mr-3"/>
                      <span className='text-black text-[15px] bg-white text-opacity-80 absolute left-5 top-5 px-1 transition duration-200 input-password'>Password</span>
                  </label>  
                </div>
               
                <div className='flex flex-col items-end'>
                  <Text className='text-[14px] text-text-primary font-Poppins float-right'>Forgot your password</Text>
                    <span className='block font-Poppins text-[11px]'>click <a href='#' className='text-blue-600 hover:underline cursor-pointer'>forgot password</a> to send request to the system administrator</span>
                </div>
              
                  <button className='btn-md w-[50%] bg-gray-300 font-Poppins rounded-sm px-10 hover:bg-[#00bdff] hover:text-white hover:ring-2 hover:ring-white hover:rounded-sm' 
                      onClick={onLoginButtonClicked}> Login </button> 
                    
                
            </div>
        
        </FlexBoxInner>
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

