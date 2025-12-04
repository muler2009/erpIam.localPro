import React, { useState } from 'react'
import { FlexBox, FlexBoxInner, FlexInnerContainer, FlexOuterContainer, Text } from '../../../../../components/reusable/StyledComponent'
import { Input , InputWithDesc} from '../../../../../components/reusable'
import * as BiIcons from 'react-icons/bi'
import { useUserAccountContext } from '../../context/useUserAccountContext';
import * as CiIcons from "react-icons/ci";


const IdentityRegistrationForm = () => {

  const { 
    userData, 
    handleUserIdentityCreationInputChanges, 
    usernameType, 
    passwordType,
    handleUsernameChange, 
    handleUsernameTypeChange, 
    handlePasswordChange, 
    handlePasswordTypeChange 
  } = useUserAccountContext()
 
  
  
  
  return (
    <FlexOuterContainer className='flex flex-col px-5'>
      <FlexInnerContainer className='flex gap-5 px-10'>
        <InputWithDesc 
            label='First Name *'
            id= 'first_name'
            type='text'
            placeholder='Firs Name'
            name='first_name'
            className='input-md font-Poppins text-[13px]'
            desc='Name of the user'
            value={userData?.first_name}
            onChange={handleUserIdentityCreationInputChanges}
        />
        <InputWithDesc 
            label='Last Name *'
            id= 'last_name'
            type='text'
            placeholder='Last Name'
            name='last_name'
            className='input-md font-Poppins text-[13px]'
            desc='Father name of the user'
            value={userData?.last_name}
            onChange={handleUserIdentityCreationInputChanges}
        />
      </FlexInnerContainer>

      <FlexInnerContainer className='flex flex-col border-t-[1px] bg-gray-50'>
        <Text className='font-Rubik text-[#333] text-opacity-50 text-[15px] py-2 px-4'>Authentication Information</Text> 
        <FlexInnerContainer className='flex flex-col gap-2'>
          <Text className='flex items-center text-[#333] text-opacity-80 text-sm'>
            <span className='pr-2'>{CiIcons.CiUser({})}</span>Username
          </Text>
          <FlexBox className='flex gap-4 px-6'>
            <FlexBoxInner className='flex flex-col'>
              <label className='flex items-center justify-start space-x-2 cursor-pointer'>
                <input 
                  type="radio" 
                  name='usernameType'
                  value="auto"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                  checked={usernameType === 'auto'} 
                  onChange={handleUsernameTypeChange}  
                />
                <Text className='text-[12px] whitespace-nowrap font-Poppins text-[#333] text-opacity-80'>Generate username Automatically</Text>
              </label>  
              <p className='text-[11px] px-6 text-[#333] text-opacity-60'>Click the radio box to generate username automatically for the user</p> 
            </FlexBoxInner>

            <FlexBoxInner className='flex flex-col flex-grow'>
              <label className='flex items-center justify-start space-x-1 cursor-pointer'>
                <input 
                  type="radio" 
                  name='usernameType' 
                  value='manual'
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={usernameType === 'manual'} 
                  onChange={handleUsernameTypeChange}
                />
                <h1 className='text-[12px] whitespace-nowrap font-Poppins text-[#333] text-opacity-80 pl-1'>Manuall-set-the-username</h1>
              </label>
              <div className='flex-grow ml-7'>
                <InputWithDesc 
                  id='username_input'
                  type='text'
                  placeholder='Custom Username'
                  className='input-md font-Poppins text-[13px] '
                  name='username'
                  value={userData?.username}
                  onChange={handleUsernameChange}
                  disabled={usernameType === 'auto'}
                  desc='Enter custom username or let system generate one'
                />
              </div>  
            </FlexBoxInner>

          </FlexBox>
        </FlexInnerContainer>

        <FlexInnerContainer className='flex flex-col gap-4'>
          <Text className='flex items-center text-[#333] text-opacity-80 text-sm'>
            <span className='pr-2'>{CiIcons.CiLock({})}</span>Password
          </Text>
          <FlexBox className='flex px-4'>
            <div className='flex flex-col pl-2'>
              <label className='flex items-center justify-start space-x-2 cursor-pointer'>
                <input 
                    type="radio" 
                    name='passwordType'
                    value="auto"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                    checked={passwordType === 'auto'} 
                    onChange={handlePasswordTypeChange}  
                />
                  <Text className='text-[12px] whitespace-nowrap font-Poppins text-[#333] text-opacity-80'>Generate Password Automatically</Text>
              </label>  
              <p className='text-[11px] px-6 text-[#333] text-opacity-60'>Click the radio box to generate password automatically for the user</p>
            </div>

            <div className='flex flex-col flex-grow pl-5'>
              <label className='flex items-center justify-start space-x-1 cursor-pointer'>
                <input 
                  type="radio" 
                  name='passwordType' 
                  value='manual'
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={passwordType === 'manual'} 
                  onChange={handlePasswordTypeChange}
                />
                <h1 className='text-[12px] whitespace-nowrap font-Poppins text-[#333] text-opacity-80 pl-1'>Manually-set-the-password</h1>
              </label>
              <div className='flex-grow ml-7'>
                <InputWithDesc 
                  id='password_input'
                  type='password'
                  placeholder='Custom Password'
                  className='input-md font-Poppins text-[13px]'
                  name='password'
                  value={userData?.password}
                  onChange={handlePasswordChange}
                  disabled={passwordType === 'auto'}
                  desc='Enter custom username or let system generate one'
                />
              </div>  
            </div>
          </FlexBox>        
        </FlexInnerContainer>
        <FlexInnerContainer>
        <InputWithDesc 
            id= 'password_input'
            label='Email'
            icon={<>{BiIcons.BiSolidEnvelope({})}</>}
            type='email'
            placeholder='userid@domain.com'
            className='input-md font-Poppins text-[13px] disabled:bg-black w-1/2'
            name='email'
            value={userData?.email}
            onChange={handleUserIdentityCreationInputChanges}
            desc='Enter valid email adddress he/she will receive notification with account info data'
        />
        </FlexInnerContainer>
      </FlexInnerContainer>
    </FlexOuterContainer>
  )
}

export default IdentityRegistrationForm
