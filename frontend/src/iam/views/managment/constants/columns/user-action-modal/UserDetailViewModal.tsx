import React from 'react'
import { ModalContainer, ModalBody, ModalFooter, ModalHeader } from '../../../../../components/reusable'
import * as VscIcons from 'react-icons/vsc'
import { UserModalActionInterface } from '../../../../../models/user.model'
import user from '../../../../../../assets/images/user-picture.png'
import { format } from 'date-fns'

const UserDetailViewModal = ({onRequestClose, title, isOpen, link_identifier, rowData}: UserModalActionInterface) => {
  return (
    <ModalContainer className={`w-[40%] mx-auto flex flex-col relative top-[10%] shadow-2xl rounded-t-md`} >
        <ModalBody className='bg-white text-black relative h-full pb-5 '>
          <div className={`flex space-x-2 py-5`}>
                <div className={`w-1/4 border-r h-full bg-indigo-50`}>
                    <img src={user} alt={`${rowData?.first_name} profile picture`}  />
                </div>  
                <div className={`w-3/4 flex flex-col gap-2 px-2`}>
                    <div className='block pt-5 pb-2 relative'>
                        <h1 className={`text-xl font-Poppins font-semibold ${rowData?.is_active ? 'text-green-500': 'text-red-500'} `} >{rowData?.first_name} {rowData?.last_name}</h1>
                    </div>
                    <div className={`flex justify-between space-x-5 py-4 px-4 bg-gray-50 border-b`}>
                        <div className='flex flex-col gap-1'>
                            <h1 className={`font-Poppins text-[#333] text-opacity-60 font-semibold text-[14px]`}>full name</h1>
                            <p className='text-[#333] text-opacity-65 border px-3 py-1 bg-white'>{rowData?.first_name} {rowData?.last_name}</p>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <h1 className={`font-Poppins text-[#333] text-opacity-60 font-semibold text-[14px]`}>Email Address</h1>
                            <p className='text-[#333] text-opacity-65 border px-3 py-1 bg-white'>{rowData?.email}</p>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <h1 className={`font-Poppins text-[#333] text-opacity-60 font-semibold text-[14px]`}>Phone No:</h1>
                            <p className='text-[#333] text-opacity-65 border px-3 py-1 bg-white'>+251913158667</p>
                        </div>
                    </div>
                    <div className={`flex justify-between space-x-5 py-4 px-4 border-t border-b`}>
                        <div className='flex flex-col gap-1'>
                            <h1 className={`font-Poppins text-[#333] text-opacity-60 font-semibold text-[14px]`}>Assigned Group</h1>
                            <p className='text-[#333] text-opacity-65 border px-3 py-1 bg-white'>{rowData?.group}</p>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <h1 className={`font-Poppins text-[#333] text-opacity-60 font-semibold text-[14px]`}>Account Created Date</h1>
                            <p className='text-[#333] text-opacity-65 border px-3 py-1 bg-white'>{format(rowData?.account_created_at, 'MMM, dd yyyy')}</p>
                        </div>
                    </div>
                    <div className={`flex justify-between space-x-5 py-4 px-4 bg-gray-50`}>
                        <div className='flex flex-col gap-1'>
                            <h1 className={`font-Poppins text-[#333] text-opacity-60 font-semibold text-[14px]`}>Username</h1>
                            <p className='text-[#333] text-opacity-65 border px-3 py-1 bg-white'>{rowData?.username}</p>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <h1 className={`font-Poppins text-[#333] text-opacity-60 font-semibold text-[14px]`}>Account Modified Date</h1>
                            <p className='text-[#333] text-opacity-65 border px-3 py-1 bg-white'>{format(rowData?.account_modified_at, 'MMM, dd yyyy')}</p>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <h1 className={`font-Poppins text-[#333] text-opacity-60 font-semibold text-[14px]`}>Status</h1>
                            <p className='text-[#333] text-opacity-65 border px-3 py-1 bg-white'>
                                {rowData?.is_active ? "active" : "Inactive usr" }
                            </p>
                        </div>
                    </div>
                </div>
          </div>
        </ModalBody>

        <ModalFooter className={`flex justify-end bg-[#fff] border-t px-4 py-4`}>
            <button className={`border px-4 btn-sm hover:bg-red-500 hover:text-white`} onClick={onRequestClose}>Close</button>
        </ModalFooter>
       

   
    </ModalContainer>
  )
}

export default UserDetailViewModal