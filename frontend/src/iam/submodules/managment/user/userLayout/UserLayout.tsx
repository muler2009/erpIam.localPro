import React, { useState } from 'react'
import UserTabNavigation from '../views/UserTabNavigation'
import CreateUserAccount from '../../modals/CreateUserAccount1'
import * as LuIcons from 'react-icons/lu'
import { identityProps, userDropDown, userManagemenu } from '../../constants/nav-links/usertabLink'
import * as IoIcons  from "react-icons/io5";

import { AiFillAccountBook } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import CreateUserIdentity from '../views/user-modals/CreateUserIdentity'
import { UserAccountContextProvider } from '../context/UserAccountContext'

const UserLayout = () => {
 
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [dropdown, setDropItems] = useState<boolean>(false)
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  
  const handleDropdownItemClick = (index: number) => {
    setActiveTabIndex(index);
    setDropItems(false)
    setIsOpen(prevIsOpen => !prevIsOpen);
  }

  return (
    <>
      <div className='bg-[#fff] h-full flex flex-col'>
        <div className='flex justify-between items-end'>
          <div className='px-10 font-Rubik mt-3 w-1/2'>
              <h1 className='font-[600] text-[20px] text-[#333] '>User Management</h1>
              <p className='text-[13px] text-[#333] text-opacity-50'>An identity of user with long-term credentials given for the users</p>
          </div>

          <div className='flex justify-center items-center divide-x-[1px] space-x-4 mr-10'>
            <h6 className='font-Rubik font-semibold text-sm'>
              <Link to={`/iam`}>List of Users</Link>
            </h6>
            <div>
              <button className='btn-sm bg-[#febd69] px-5 rounded-[3px] btn-sm text-sm ml-4 text-[#333] ring-2 ring-black ring-opacity-50' onClick={() => setIsOpen(prev => !prev)}>Add user</button>
            </div>
            
                </div>
          {/* <div className='mr-10 mt-3 divide-x-[1px] divide-black'>
            <div className='flex justify-start items-center space-x-3 cursor-pointer'>
              <button className='border btn-sm rounded-[2px] bg-[#f9f9f9] px-3 py-2 text-[14px]'>
                <LuIcons.LuRefreshCw />
              </button>
              <div className='relative z-20 cursor-pointer'>
                <div className={`flex justify-start items-center px-2 py-1.5 bg-green-600 text-white rounded-[3px] ${dropdown ? 'bg-opacity-70 text-[#333] transition duration-500 ease-in-out rounded-[2px]': 'text-gray-500'}`}  onClick={() => setDropItems(prevState => !prevState)}>
                      <p className={`text-[13px] font-Poppins`}>User account</p>
                      <span className='pl-2'>{ isOpen ? <IoIcons.IoCaretBackSharp size={13} /> : <IoIcons.IoCaretForwardSharp size={13} /> } </span>
                </div>
                
                {
                  dropdown && (
                    <div className='w-[200px] bg-white flex flex-col absolute top-9 right-0 shadow-lg cursor-pointer pb-2 pt-1 z-10 border transition duration-500 ease-in-out'>
                      {
                        identityProps?.map((identity, index) => (
                          <>
                            <div key={index} className="px-2 py-2 font-Poppins text-[12px] hover:bg-gray-50 hover:bg-opacity-50 hover:text-black hover:text-opacity-50" onClick={() => handleDropdownItemClick(index)} >
                              <div className='mr-3 flex items-center'>
                                  <span className='mr-1'>{identity.icon}</span>
                                  {identity.label}
                              </div>
                            </div>     
                          </>
                      ))}
                    </div>
                  )
                }     
              </div>
             
            </div>

          </div>       */}
        </div>
        <div className='bg-[#ffffff] mr-2 my-5 shadow-sm h-full'>
          <UserTabNavigation />  
        </div>
      </div>
    
      {/* { isOpen && identityProps[activeTabIndex].abbrevation === 'SingleNewID' && ( <CreateNewAccount isOpen={isOpen} setIsOpen={setIsOpen} title="New identity" /> ) }
      { isOpen && identityProps[activeTabIndex].abbrevation === 'MultiNewID' && ( <CreateUserAccount1 isOpen={isOpen} setIsOpen={setIsOpen} title="For the notofivation" /> ) } */}
      {
        isOpen && ( 
          <UserAccountContextProvider>
            <CreateUserIdentity isOpen={isOpen} setIsOpen={setIsOpen} title="New identity" /> 
          </UserAccountContextProvider>
      )
      }
    </>
  )
}

export default UserLayout

