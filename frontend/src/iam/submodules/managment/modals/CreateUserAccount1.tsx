import { title } from 'process';
import React from 'react'
import * as Vsc from 'react-icons/vsc'
import { Input, ModalBody, ModalFooter, ModalHeader } from '../../../components/reusable';
import { ModalProps } from '../../../models/user.model';
import Select from '../../../components/reusable/Select';
import { useGetRolesQuery } from '../../../features/roleAPI';
import useUserAccount from '../../../hooks/useUserAccount';

const CreateUserAccount1 = ({setIsOpen, isOpen, title} : ModalProps) => {

    const {data, isSuccess, isLoading} = useGetRolesQuery()
    const userRoles = data || []

    const {userAccount, canSave, handleCreateAccInputChange} = useUserAccount()
    
    const closeModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        setIsOpen(prevState => !prevState)
    }

    return isOpen ? (
        <div className="bg-black bg-opacity-5 inset-0 fixed top-0 z-50 font-Poppins">
            <div className={`w-[40%] mx-auto bg-[#fff] flex flex-col gap-4 relative top-[10%] shadow-2xl rounded-[5px]`} >
                <ModalHeader className='flex justify-between items-center px-5 py-3 border-b-[1px]'>
                    <h1 className='font-Rubik text-[17px] text-black text-opacity-50 text-center px-5'>
                        {title}
                    </h1>
                    <div className="w-5 h-5 flex justify-center items-center cursor-pointer rounded-full hover:bg-red-400 hover:text-white" 
                    onClick={(event) => setIsOpen(prevState => !prevState)}>
                        <Vsc.VscClose size={15} />
                    </div>
                </ModalHeader>
                <ModalBody className='flex flex-col gap-1'>
                    <div className='bg-green-50 rounded-[3px] mx-10 border-l-[5px] border-green-600'>
                        <p className='px-3 text-[13px] text-justify py-3 font-MonaSans text-gray-700'>
                            <span className=''>Remark</span> : Once you associate this deduction with an employee, you will only be able to edit the name in PaySlip. The Change will be reflected in both new and existing employees
                        </p>
                    </div>
                    <div className='flex flex-col gap-5 mx-10 mt-5 mb-10'>
                        <div className='flex space-x-4'>
                            <Input 
                                label='First Name'
                                id= 'firstName_input'
                                type='text'
                                placeholder='First Name'
                                name='firstName'
                                className='input-md font-Poppins text-[13px]'
                                value={userAccount.firstName}
                                onChange={handleCreateAccInputChange}
                            />
                            <Input 
                                label='Last Name'
                                id= 'lastName_input'
                                type='text'
                                placeholder='Last Name'
                                name='lastName'
                                className='input-md font-Poppins text-[13px]'
                                value={userAccount.lastName}
                                onChange={handleCreateAccInputChange}
                            />
                        </div>
                        <Input 
                            label='Email'
                            id= 'email_input'
                            type='text'
                            placeholder='@domain.com'
                            name='email'
                            className='input-md font-Poppins text-[13px]'
                            value={userAccount.email}
                            onChange={handleCreateAccInputChange}
                        />
                        <div className='flex space-x-4'>
                            <Select 
                                title='User Role'
                                options={userRoles}
                            />
                            <Input 
                                label='Phone Number'
                                id= 'phone_number_input'
                                type='number'
                                placeholder='+2519...'
                                name='phone'
                                className='input-md font-Poppins text-[13px]'
                                value={userAccount.phone}
                                onChange={handleCreateAccInputChange}
                            />
                        </div>
                        <div className='flex space-x-4'>
                            <Input 
                                label='Username'
                                id= 'username_input'
                                type='text'
                                placeholder='Username'
                                name='username'
                                className='input-md font-Poppins text-[13px]'
                                value={userAccount.username}
                                onChange={handleCreateAccInputChange}
                            />
                            <Input 
                                label='Password'
                                id= 'password_input'
                                type='password'
                                placeholder='Type User password'
                                name='password'
                                className='input-md font-Poppins text-[13px]'
                                value={userAccount.password}
                                onChange={handleCreateAccInputChange}
                            />
                        </div>
                      
                    </div>
                </ModalBody>
                <ModalFooter className='px-4 py-4 flex space-x-3 border-t'>
                    <div className='mx-5 flex space-x-3'>
                        <button className={`px-5 text-slate-200 text-sm disabled:bg-gray-200`}
                                onClick={()=> alert("successfully submitted")}
                                disabled={!canSave}>Save</button>
                        <button className='px-5 text-[#333] text-sm btn-sm border-[1px] border-gray-500 border-opacity-40 disabled:bg-gray-50'
                                onClick={(event) => closeModal(event)}>
                            Cancel
                        </button>

                    </div>
                </ModalFooter>
            </div>
        </div>
      ) : null;
}

export default CreateUserAccount1

