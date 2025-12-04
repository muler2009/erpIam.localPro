import React, {useCallback, useState} from 'react'
import { LuUser } from 'react-icons/lu'
import { FlexBox, FlexBoxInner, Text, P } from '../../../../../../components/common/StyledComponent'
import { Link } from 'react-router-dom'
import CreateUserIdentity from '../user-modals/CreateUserIdentity'
import { UserAccountContextProvider } from '../../context/UserAccountContext'
import * as FaIcons from "react-icons/fa6";

const UserNavigationHeader = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const openCreateIdentity = useCallback(() => { setIsOpen(prev => !prev) }, [isOpen])

  return (
     <div className='flex justify-between items-center pt-4 pb-3 px-4 bg-gradient-to-b mx-1 from-white to-gray-100'>
        <div className='flex flex-col gap-4 px-2'>
            <div className='flex space-x-2 items-start'>
                 { LuUser({size: 25, className: 'text-primary-green'}) }
                <Text className='font-Poppins font-semibold text-2xl '>IAMs | 
                    <span className='text-[16px] font-normal text-blue-700 text-opacity-70 pl-1'>User Management</span>
                    <span className='text-[#333] text-[11px] font-Poppins text-opacity-50 block font-normal -mt-2'>
                        An identity of user with long-term credentials given for the users
                    </span>
                </Text>
            </div>
        </div>
        <div className={`flex justify-start items-end px-2 border border-black border-opacity-15 rounded-[5px] py-[8px] cursor-pointer hover:bg-text-primary hover:text-white text-[#333] text-opacity-75`} onClick={openCreateIdentity} >
            { FaIcons.FaUserPlus({}) }
            <span className='font-Poppins text-[12px] px-2'>New account</span>
        </div>

        {
            isOpen && ( 
                <UserAccountContextProvider>
                    <CreateUserIdentity isOpen={isOpen} openCreateIdentity={openCreateIdentity} title="New identity" /> 
                </UserAccountContextProvider>
            )
        }
          
    </div>
  )
}

export default UserNavigationHeader