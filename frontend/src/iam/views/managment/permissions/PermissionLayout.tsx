import React, { useState } from 'react'
import * as RxIcons from 'react-icons/rx'
import { userDropDown } from '../constants/nav-links/usertabLink'

const PermissionLayout = () => {
    const [managePermission, setManagePermission] = useState<boolean>(false)
 

  return (
  
      <div className='flex flex-col h-full mt-2'>
        <div className='flex justify-between items-center border-b mb-5'>
            <div className='py-2 px-10 font-Rubik '>
                <h1 className='font-[600] text-[20px] text-[#333] '>Permission Management</h1>
                <p className='text-[13px] text-[#333] text-opacity-40'>Views and manage permission in your organization</p>
            </div>

            <div className='relative z-20 w-[12%] justify-end flex mr-10 cursor-pointer' onClick={() => setManagePermission(prev => !prev)}>
                <div className={`py-2 px-1 flex bg-green-600 text-white rounded-[2px] ${managePermission && 'bg-[#e6e6e6]'}`} >
                    <span className='font-Poppins mx-3 text-[13px] whitespace-nowrap'>Manage Permission</span>
                        {
                            managePermission ? <RxIcons.RxCaretUp size={20} /> : <RxIcons.RxCaretDown size={20} /> 
                        } 
                </div>
                    {
                        managePermission && (
                            <div className='w-full bg-white flex flex-col absolute top-[40px] left-0 shadow-lg cursor-pointer py-2 z-10'>
                                {
                                     userDropDown?.map((tab, index) => (
                                        <>
                                            <div key={index} 
                                                className="px-2 py-2 font-Poppins text-[12px] hover:bg-gray-50 hover:bg-opacity-50 hover:text-[#333] hover:text-opacity-50"
                                                onClick={() => setManagePermission(prev => !prev)} 
                                            >
                                                <div className='flex justify-start items-center'>
                                                    <span className='mr-3'>{tab.icon}</span>{tab.label}
                                                </div>
                                            </div>
                        
                                        </>
                                    ))}
                            </div>

                        )
                    }
            </div>
        </div>
      </div>
 
  )
}

export default PermissionLayout
