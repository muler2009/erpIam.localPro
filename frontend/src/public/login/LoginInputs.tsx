import React, {useState} from 'react'
import { Input, Button } from '../../components/common'
import { FaUserAlt, FaLock } from 'react-icons/fa'
import useLogin from '../../auth/login/useLogin'
import erp from '../../assets/images/erp.png'


const LoginInputs = () => {
  const { 
    loginData, 
    handleInputLoginChanges, 
    onLoginButtonClicked 
  } = useLogin()

  return (
    <div className='flex-1 bg-[#013243] bg-opacity-5 flex justify-center items-center py-5'>
      <div className='w-[30%] shadow-lg bg-[#fff]  border-gray-200 pt-10 py-5 my-5'>
          <div className='py-5 border-b flex flex-col items-center border-1 px-5'>
            <div className='flex justify-center'>
              <img src={erp} className='object-center object-cover w-1/2' />
            </div>
            <div className=''>
            <h6 className="pb-5 font-Oswald text-[35px] text-center">Identity & Access Management 
              <span className='text-[30px] ml-3 text-[#02e079]'>(IAM)</span>
            </h6>
            </div>
          </div>

          <form className='flex flex-col gap-6 pb-10 w-[80%] mx-auto' onSubmit={(event) => event.preventDefault()}>
            {/* Username Field */}
            <div className='mt-10 flex flex-col gap-5 px-10'>
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
            </div>
            <div className='flex space-x-5 px-10'>
              <Button 
                  label="OK" 
                  className='btn-sm bg-gray-300 font-Poppins rounded-sm px-10 hover:bg-[#00bdff] hover:text-white hover:ring-2 hover:ring-white hover:rounded-sm' 
                  onClick={onLoginButtonClicked}
                />
                <Button 
                  label="Cancel" 
                  className='btn-sm bg-gray-300 font-Poppins rounded-sm px-5 hover:bg-[#00bdff] hover:text-white hover:ring-2 hover:ring-white hover:rounded-sm' 
                  onClick={onLoginButtonClicked}
                />
                <Button 
                  label="Help" 
                  className='btn-sm bg-gray-300 font-Poppins rounded-sm px-5 hover:bg-[#00bdff] hover:text-white hover:ring-2 hover:ring-white hover:rounded-sm' 
                  onClick={onLoginButtonClicked}
                />
                <Button 
                  label="Option" 
                  className='btn-sm bg-gray-300 font-Poppins rounded-sm px-5 hover:bg-[#00bdff] hover:text-white hover:ring-2 hover:ring-white hover:rounded-sm' 
                  onClick={onLoginButtonClicked}
                />
            </div>
        </form>
      </div>
    </div>
  )
}

export default LoginInputs
