import React from 'react'
import RoleTab from '../views/RoleTab'



const RoleLayout: React.FC = () => {

  return (
    <div className='bg-[#f9fafb] bg-opacity-60 h-full flex flex-col'>
      <div className='py-2 mt-2 px-10 font-Rubik'>
            <h1 className='font-[600] text-[20px] text-[#333] '>Role Management</h1>
            <p className='text-[13px] text-[#333] text-opacity-40'>Views and manage role in your organization</p>
      </div>
      <div className='bg-[#ffffff] mx-2 my-5  shadow-sm h-full'>
        <RoleTab />
      </div>
    </div>
  )
}

export default RoleLayout
