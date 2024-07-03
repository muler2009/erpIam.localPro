import React from 'react'
import { FlexInnerContainer, FlexOuterContainer, Text } from '../../../../../components/reusable/StyledComponent'
import { Input , InputWithDesc} from '../../../../../components/reusable'
import useUserIdentityProps from '../../context/useUserIdentityProps'
import  * as RiIcons from "react-icons/ri";
import * as BiIcons from 'react-icons/bi'


const IdentityRegistrationForm = () => {

  const { userData, handleUserIdentityCreationInputChanges } = useUserIdentityProps()

  return (
   <FlexOuterContainer className='flex flex-col px-5 mt-10'>
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

    <FlexInnerContainer className='flex flex-col border-t-[1px] mt-5 bg-gray-50'>
      <Text className='font-Rubik text-[#333] text-opacity-50 text-[15px] py-3 px-4'>Authentication Information</Text> 
      <FlexInnerContainer className='flex flex-col'>
        <Text className='flex items-center text-[#333] text-opacity-80 text-sm'>
          <span className='pr-1'><RiIcons.RiAccountCircleFill /></span>Username
        </Text>
        <FlexInnerContainer className='flex w-full'>
          <div className='flex flex-col w-1/4'>
            <label className='flex items-center justify-start space-x-2 cursor-pointer'>
              <input 
                  type="radio" 
                  name='passwordType'
                  value="autoPassword"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                  checked={userData?.passwordType === 'autoPassword'} 
                  onChange={handleUserIdentityCreationInputChanges}  
              />
                <Text className='text-[12px] whitespace-nowrap font-Poppins text-[#333] text-opacity-80'>Generate Username Automatically</Text>
            </label>  
            <p className='text-[11px] px-6 text-[#333] text-opacity-60'>Click the radio box to generate username automatically for the user</p>
          </div>
          <div className='flex flex-col w-2/3'>
            <label className='flex items-center justify-start space-x-1 cursor-pointer'>
                <input 
                    type="radio" 
                    name='passwordType' 
                    value='customPassword'
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    checked={userData?.passwordType === 'customPassword'} 
                    onChange={handleUserIdentityCreationInputChanges}
                />
                <h1 className='text-[12px] whitespace-nowrap font-Poppins text-[#333] text-opacity-80'>Manually set the username</h1>
            </label>
            <div className=''>
                {
                    userData?.passwordType === 'customPassword' ? (
                        <InputWithDesc 
                            id= 'password_input'
                            type='password'
                            placeholder='Custom Password'
                            className='input-md font-Poppins text-[13px] disabled:bg-black'
                            name='password'
                            value={userData?.password}
                            onChange={handleUserIdentityCreationInputChanges}
                            desc='User password for authentication'
                        />
                    ) : (
                        <InputWithDesc 
                            id= 'password_input'
                            type='password'
                            placeholder='Custom Password'
                            name='password'
                            className='input-md font-Poppins text-[13px] disabled:bg-gray-100'
                            disabled
                            desc='User password for authentication'
                        />
                    )
                }
            </div>  
          </div>
        </FlexInnerContainer>        
      </FlexInnerContainer>

      <FlexInnerContainer className='flex flex-col'>
        <Text className='flex items-center text-[#333] text-opacity-80 text-sm'>
          <span className='pr-1'><RiIcons.RiLockPasswordFill /></span>Password
        </Text>
        <FlexInnerContainer className='flex'>
          <div className='flex flex-col'>
            <label className='flex items-center justify-start space-x-2 cursor-pointer'>
              <input 
                  type="radio" 
                  name='passwordType'
                  value="autoPassword"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                  checked={userData?.passwordType === 'autoPassword'} 
                  onChange={handleUserIdentityCreationInputChanges}  
              />
                <Text className='text-[12px] whitespace-nowrap font-Poppins text-[#333] text-opacity-80'>Generate Password Automatically</Text>
            </label>  
            <p className='text-[11px] px-6 text-[#333] text-opacity-60'>Click the radio box to generate password automatically for the user</p>
          </div>
          <div className='flex flex-col'>
            <label className='flex items-center justify-start space-x-1 cursor-pointer'>
                <input 
                    type="radio" 
                    name='passwordType' 
                    value='customPassword'
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    checked={userData?.passwordType === 'customPassword'} 
                    onChange={handleUserIdentityCreationInputChanges}
                />
                <h1 className='text-[12px] whitespace-nowrap font-Poppins text-[#333] text-opacity-80'>Custom Password</h1>
            </label>
            <>
                {
                    userData?.passwordType === 'customPassword' ? (
                        <InputWithDesc 
                            id= 'password_input'
                            type='password'
                            placeholder='Custom Password'
                            className='input-md font-Poppins text-[13px] disabled:bg-black'
                            name='password'
                            value={userData?.password}
                            onChange={handleUserIdentityCreationInputChanges}
                            desc='User password for authentication'
                        />
                    ) : (
                        <InputWithDesc 
                            id= 'password_input'
                            type='password'
                            placeholder='Custom Password'
                            name='password'
                            className='input-md font-Poppins text-[13px] disabled:bg-gray-100'
                            disabled
                            desc='User password for authentication'
                        />
                    )
                }
            </>  

          </div>

        </FlexInnerContainer>        
      </FlexInnerContainer>
      <FlexInnerContainer>
      <InputWithDesc 
          id= 'password_input'
          label='Email'
          icon={<BiIcons.BiSolidEnvelope />}
          type='email'
          placeholder='userid@domain.com'
          className='input-md font-Poppins text-[13px] disabled:bg-black'
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