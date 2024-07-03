import React, { useState, useContext } from 'react'
import { Input, InputWithDesc } from '../../../../components/reusable'
import { Link } from 'react-router-dom'
import useCreateUserAccount from '../context/useCreateUserAccount'
import useUserContext from '../context/useUserContext'
import CreateUserAccountContext from '../context/CreateUserAccountContext'


const UserDetail = () => {

  const { newUserAccount, handleUserCreateInputChanges } = useUserContext()

  return (
    <div className='flex flex-col gap-2 px-16'>
        <div className='flex flex-col gap-3'>
            <div className='flex flex-col'>
                <h1 className='text-[18px] font-Rubik text-[#333] text-opacity-70 border-b py-1'>Set user details</h1>
                <div className='bg-gray-50 rounded-[2px] border-l-[5px] border-gray-600 mt-1 py-1'>
                    <p className=' mx-3 text-[13px] text-[#333] text-opacity-50 '>Add single user once with the predefined access type and permission</p>
                </div>
            </div>
            <div className='mt-4 flex space-x-10'>
               
                <Input 
                    label='Email *'
                    id= 'email_input'
                    type='text'
                    placeholder='Email'
                    name='email'
                    className='input-md font-Poppins text-[13px]'
                    value={newUserAccount?.email}
                    onChange={handleUserCreateInputChanges}
                />
                <Input 
                    label='Username *'
                    id= 'username_input'
                    type='text'
                    placeholder='Username'
                    name='username'
                    className='input-md font-Poppins text-[13px]'
                    value={newUserAccount?.username}
                    onChange={handleUserCreateInputChanges}
                />

          
            </div>
        </div>

        <div className='flex flex-col pt-5'>
            <h1 className='text-[20px] font-Rubik text-[#333] text-opacity-70 border-b py-1'>Select access type</h1>
            <div className='bg-gray-50 rounded-[2px] border-l-[5px] border-gray-600 mt-1 py-3'>
                <p className=' mx-3 text-[12px] text-[#333] text-opacity-50 '>
                    Select how the user will primarily access the ERP. if you choose only programmatic access 
                    <Link to={"."} className='text-blue-400 text-sm'>{" "}Learn more</Link>
                </p>
            </div>   
        </div>

        <div className='flex justify-center items-start h-[300px] border'>
            <div className='flex space-x-5 pt-5 px-3'>
                <h1 className='text-[#333] text-opacity-70 text-sm whitespace-nowrap'>Access Type <span className='text-red-700'>*</span></h1>
                <div className='flex flex-col gap-3 pl-8'>
                    <label htmlFor="accessType_input" className='flex items-center justify-start space-x-3 cursor-pointer'>
                        <input 
                            type="checkbox" 
                            id="accessType_input" 
                            className="w-4 h-4 rounded-[2px] appearance-auto checked:appearance-none checked:bg-gray-500 before:checked:text-white "
                            name='accessType'
                            checked={newUserAccount?.accessType || false}
                            onChange={handleUserCreateInputChanges} 
                        />
                        <h1 className='text-[12px] whitespace-nowrap font-Poppins text-red-600 text-opacity-80'>Programatic Access ??</h1>
                    </label>
                    <label htmlFor="authentication_input" className='flex items-center justify-start space-x-3 cursor-pointer'>
                        <input 
                            type="checkbox" 
                            id="authentication_input" 
                            className="w-4 h-4 rounded-[2px] appearance-auto checked:appearance-none checked:bg-gray-500 before:checked:text-white " 
                            name='authentication'
                            checked={newUserAccount?.authentication}
                            onChange={handleUserCreateInputChanges}
                        />
                        <h1 className='text-[12px] whitespace-nowrap font-Poppins text-[#333] text-opacity-80'>Authentication Mechanism</h1>
                    </label>
              
               
                </div>
            </div>
            {/* Access password setting section */}
            <div className='flex-grow pl-2 '>
                {
                    newUserAccount?.authentication ? (
                        <div className={`flex flex-col gap-3 pt-5 bg-gray-50 px-5 pb-10 border-l ${!newUserAccount.authentication && 'transition duration-800 ease-in-out'}`}>
                            <h1 className='text-[#333] text-opacity-70 text-sm whitespace-nowrap'>Access Password *</h1>
                            <div className='flex flex-col gap-2 flex-grow'>
                                
                                <label className='flex items-center justify-start space-x-3 cursor-pointer'>
                                    <input 
                                        type="radio" 
                                        name='passwordType' 
                                        value="autoPassword"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                        checked={newUserAccount?.passwordType === 'autoPassword'} 
                                        onChange={handleUserCreateInputChanges}  
                    
                                    />
                                    <h1 className='text-[12px] whitespace-nowrap font-Poppins text-[#333] text-opacity-80'>System Generated Password</h1>
                                </label>  
                                <label className='flex items-center justify-start space-x-3 cursor-pointer'>
                                    <input 
                                        type="radio" 
                                        name='passwordType' 
                                        value='customPassword'
                                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        checked={newUserAccount?.passwordType === 'customPassword'} 
                                        onChange={handleUserCreateInputChanges}
                                    />
                                    <h1 className='text-[12px] whitespace-nowrap font-Poppins text-[#333] text-opacity-80'>Custom Password</h1>
                                </label>
                                <div className='pt-3'>
                                    {
                                        newUserAccount?.passwordType === 'customPassword' ? (
                                            <InputWithDesc 
                                                id= 'password_input'
                                                type='password'
                                                placeholder='Custom Password'
                                                className='input-md font-Poppins text-[13px] disabled:bg-black'
                                                name='password'
                                                value={newUserAccount?.password}
                                                onChange={handleUserCreateInputChanges}
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

                                <div className='flex flex-col gap-3'>
                                    <h1 className='text-[12px] whitespace-nowrap font-Poppins text-[#333] text-opacity-80'>Password Policy</h1>
                                    <div className='flex flex-col'>
                                        <label className='flex items-start justify-start space-x-3 cursor-pointer'>
                                            <input 
                                                type="checkbox" 
                                                name='policy' 
                                                className="w-4 h-4 rounded-[2px] appearance-auto checked:appearance-none checked:bg-gray-500before:checked:text-white checked:border checked:border-black"
                                                checked={newUserAccount?.policy || false}  
                                                onChange={handleUserCreateInputChanges}
                                                
                                                />
                                                <div className='flex flex-col'>
                                                    <h1 className='text-[12px] whitespace-nowrap font-Poppins text-[#333] text-opacity-80'>User can change its password in the first sign-in</h1>
                                                    <h1 className='text-[12px] whitespace-nowrap font-Poppins text-[#333] text-opacity-80'>User automatically get <span className='text-blue-600'>ModifyPasswordPolicy</span> for changing the password</h1>
                                                </div>
                                        </label>  
                                    </div>
                                </div>
                            </div>
                        </div>
                    ): null
                }
            </div>
        </div>
    </div>
  )
}

export default UserDetail

