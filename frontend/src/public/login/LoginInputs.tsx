import React, {useState} from 'react'
import { Input, Button } from '../../components/common'
import { FaUserAlt, FaLock } from 'react-icons/fa'
import useLogin from '../../iam/auth/login/useLogin'
import erp from '../../assets/images/erp.png'
import { LoginErrorMessageModal } from '../../iam/components/errors/LoginError'
import { ErrorResponseInterface } from '../../iam/models/error.model'
import { Div, FlexBox, FlexBoxInner, Text } from '../../components/common/StyledComponent'
import LoginInstruction from './LoginInstruction'
import system from '../../assets/images/system.png'
import { Link } from 'react-router-dom'
import AccountLocked from '../../iam/components/errors/AccountLocked'


const LoginInputs = () => {
  const { 
    loginData, 
    loginFailed, 
    isLocked,
    loginErrorMessage, 
    activateLoginBtn,
    setIsLocked,
    handleInputLoginChanges,
    onLoginButtonClicked, 
    setLoginFailed, 
  } = useLogin()
 
  return (
    <FlexBox className={`py-5 w-[30%] h-[70vh] my-[2px] mx-auto bg-white shadow-md border`}>  
      <div className='border-b flex justify-center pb-5'>
        <img src={system} className={``} />
      </div>
      <div className={`px-10 flex flex-col space-y-5 justify-center py-5`}>
        <Text className='text-[25px] font-Poppins text-button-primary font-semibold text-center '>
          Welcome To e-ISDMS <span className={`block text-[12px] font-normal text-[#333] text-opacity-70`}>Use credential provided by the system admin to log into the system</span>
        </Text>
          <div className="relative font-Poppins">
            <label className='relative cursor-pointer py-2 flex flex-row items-center'>
                <input 
                  id='username'
                  type='text' 
                  name='username'
                  placeholder='username'
                  className='w-full pl-6 pr-10 pt-4 text-black input-md rounded-md border-opacity-50 focus:bg-white placeholder-gray-300 placeholder-opacity-0 transition duration-200' 
                  value={loginData.username}
                  onChange={handleInputLoginChanges}
                />
                <FaUserAlt color="gray" className="absolute right-2 mr-3 "/>
                <span className='text-black text-[15px] bg-white text-opacity-80 absolute left-5 top-5 px-1 transition duration-200 input-text border-none'>Username</span>
            </label>  
          </div>
          {/* Password Field */}
          <div className="relative font-Poppins">
            <label className='relative cursor-pointer py-2 flex flex-row items-center'>
              <input 
                id='password'
                type='password' 
                name={`password`}
                placeholder={`password`}
                className={`w-full pl-6 pr-10 pt-4 text-black input-md border-opacity-50 focus:outline-none focus:border-green-600 focus:bg-white placeholder-gray-300 placeholder-opacity-0 transition duration-200 focus:border-inherit`}    
                value={loginData.password}
                onChange={handleInputLoginChanges} 
              />
              <FaLock color="gray" className={`absolute right-2 mr-3`} />
              <span className={`text-black text-[15px] bg-white text-opacity-80 absolute left-5 top-5 px-1 transition duration-200 input-password border-none`}>Password</span>
            </label>  
          </div>
          <div className={`flex flex-col space-y-1 items-start`}>
            <Text className={`text-[13px] text-text-primary font-Poppins float-right`}>Forgot your password</Text>
            <Text className={`block font-Poppins text-[11px]`}>
              Click here to <span className='text-blue-600 hover:underline cursor-pointer'>change password</span>
            </Text>
          </div>
          <button  
            className={`btn-md py-2 font-IBMPlexSans font-semibold bg-button-primary text-white rounded-[4px] disabled:bg-gray-50 disabled:text-[#333] disabled:text-opacity-50`} 
            disabled={!activateLoginBtn}
            onClick={onLoginButtonClicked}
          >Login</button>           
      </div>

      <div className={`py-2 font-Poppins text-[#333] rounded-[4px] text-[12px] flex justify-center items-center pb-5 text-opacity-50`}>Create System Account
        <Link to="register" className={`block font-Poppins pl-2 hover:text-button-primary font-semibold text-[14px] text-[#333]  text-opacity-100`}>Register</Link>
      </div>
     
      <LoginErrorMessageModal 
        loginErrorMessage={loginErrorMessage}
        loginFailed={loginFailed} 
        setLoginFailed={setLoginFailed} 
      />

      <AccountLocked 
        isLocked={isLocked}
        setIsLocked={setIsLocked}
        loginErrorMessage={loginErrorMessage}
      />
    </FlexBox>
  )
}

export default LoginInputs


{/* <ChangePasswordComponent 
  open={open}
  handleIsOpenCloseMenuModal = {handleIsOpenCloseMenuModal}
  title={`Change Password`}
/> */}