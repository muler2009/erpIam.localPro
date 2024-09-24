import React from 'react'
import { FlexBoxInner, FlexBox, Div, Text } from '../../components/common/StyledComponent'
import RegistrationInstruction from './RegistrationInstruction'
import InputWithDesc from '../../components/common/InputWithDesc'

const RegistrationForm = () => {
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
                                name='firstname'
                                desc="enter your name"
                            />
                            <InputWithDesc 
                                label='Last Name'
                                type='text'
                                id='lastname_input'
                                placeholder='Last name'
                                className='input-md'
                                name='lastname'
                                desc="Enter Last name"
                            />

                        </Div>
                        <InputWithDesc 
                            label='Email'
                            type='email'
                            id='email_input'
                            placeholder='Email address'
                            className='input-md'
                            name='email'
                            desc="example: email@domain.com"
                        />
                        <InputWithDesc 
                            label='Username'
                            type='text'
                            id='username_input'
                            placeholder='Username'
                            className='input-md'
                            name='username'
                            desc="Username: required to get access the system"
                        />
                        <Div className='flex space-x-3'>
                            <InputWithDesc 
                                label='Password'
                                type='password'
                                id='password_input'
                                placeholder='Password'
                                className='input-md'
                                name='password'
                                desc=' Must include uppercase and lowercase letters, a number and a special character. symbol, number underscore'
                            />
                            <InputWithDesc 
                                label='Confirm Password'
                                type='password'
                                id='confirm_password_input'
                                placeholder='Confirm Password'
                                className='input-md'
                                name='confirm_password'
                                desc="Re-enter the password"
                            />

                        </Div>
                        <Div className='block pt-5'>
                            <button className='bg-blue-900 font-Poppins text-white w-1/2'>Create Account</button>

                        </Div>
                    </Div>
                </Div>
            </Div>
            <RegistrationInstruction />
        </FlexBoxInner>       
    </FlexBox>
  )
}

export default RegistrationForm