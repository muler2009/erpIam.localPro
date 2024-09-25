import React, {useState} from 'react'
import { FlexBoxInner, FlexBox, Div, Text } from '../../components/common/StyledComponent'
import RegistrationInstruction from './RegistrationInstruction'
import InputWithDesc from '../../components/common/InputWithDesc'
import useRegistration from '../../iam/hooks/useRegistration'
import { useUserSelfRegistrationMutation } from '../../iam/features/userAPI'
import { ErrorResponseInterface } from '../../iam/models/error.model'
import { LoginErrorMessageModal } from '../../iam/components/errors/LoginError'

const RegistrationForm = () => {

    const {
        registeration, 
        handleRegistrationInputs, 
        canSave, setLoginFailed, 
        loginFailed, loginErrorMessage, 
        onRegisterEventClicked
    } = useRegistration()
   


  return (
    <FlexBox className='w-[80%] mx-auto shadow-md h-[95%] mt-2 mb-10 border'>
        <FlexBoxInner className='flex space-x-2 justify-start items-start p-1 h-full'>
            <Div className='flex-grow pt-5'>
                <Div className='flex flex-col space-x-2 px-20 py-10'>
                    <Div className='pt-2 whitespace-nowrap py-5 relative'>
                        <Text className='font-Poppins text-[25px] font-semibold text-[#5e2f05] text-opacity-80'>Get Account
                        <span className='font-Poppins font-normal text-[#333] block -pt-2 text-[12px] text-opacity-70 after:absolute after:content-[""] after:w-[80%] after:h-[1px] after:bg-gray-100 after:bottom-7 after:left-[27%]'>Creating account to get our service</span>
                        </Text>
                    </Div>
                    <Div className='flex flex-col space-y-4'>
                        <Div className='flex space-x-3'>
                            <InputWithDesc 
                                label='Firstname'
                                type='text'
                                id='firstname_input'
                                placeholder='First Name'
                                className='input-md'
                                desc="enter your name"
                                name='first_name'
                                value={registeration?.first_name}
                                onChange={handleRegistrationInputs}
                            />
                            <InputWithDesc 
                                label='Last Name'
                                type='text'
                                id='lastname_input'
                                placeholder='Last name'
                                className='input-md'
                                desc="Enter Last name"
                                name='last_name'
                                value={registeration?.last_name}
                                onChange={handleRegistrationInputs}
                            />

                        </Div>
                        <InputWithDesc 
                            label='Email'
                            type='email'
                            id='email_input'
                            placeholder='Email address'
                            className='input-md'
                            desc="example: email@domain.com"
                            name='email'
                            value={registeration?.email}
                            onChange={handleRegistrationInputs}
                        />
                        <InputWithDesc 
                            label='Username'
                            type='text'
                            id='username_input'
                            placeholder='Username'
                            className='input-md'
                            desc="Username: required to get access the system"
                            name='username'
                            value={registeration?.username}
                            onChange={handleRegistrationInputs}
                        />
                        <Div className='flex space-x-3'>
                            <InputWithDesc 
                                label='Password'
                                type='password'
                                id='password_input'
                                placeholder='Password'
                                className='input-md'
                                desc=' Must include uppercase and lowercase letters, a number and a special character. symbol, number underscore'
                                name='password'
                                value={registeration?.password}
                                onChange={handleRegistrationInputs}
                            />
                            <InputWithDesc 
                                label='Confirm Password'
                                type='password'
                                id='confirm_password_input'
                                placeholder='Confirm Password'
                                className='input-md'
                                desc="Re-enter the password"
                                name='confirm_password'
                                value={registeration?.confirm_password}
                                onChange={handleRegistrationInputs}
                            />
                        </Div>
                        <Div className='block pt-5'>
                            <button 
                                className='bg-blue-900 font-Poppins text-white w-1/2 disabled:bg-gray-50' 
                                disabled={!canSave}
                                onClick={onRegisterEventClicked}
                            >
                                Create Account
                            </button>

                        </Div>
                    </Div>
                </Div>
            </Div>
            <RegistrationInstruction />
        </FlexBoxInner> 

         <LoginErrorMessageModal 
            loginErrorMessage={loginErrorMessage}
            setLoginFailed={setLoginFailed} 
            loginFailed={loginFailed} 
        />      
    </FlexBox>
  )
}

export default RegistrationForm