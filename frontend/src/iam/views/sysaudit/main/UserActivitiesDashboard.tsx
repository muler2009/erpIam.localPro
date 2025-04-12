import React from 'react'
import TabNavigation from '../../../../app/components/common/TabNavigation'
import { audit_tab_menu } from '../../managment/constants/iam-menu-items/audit'

const UserActivitiesDashboard = () => {
  return (
    <div className={`w-full`}>
       <div className='flex justify-end items-center'>
        <TabNavigation 
            tabs={audit_tab_menu}
            showSearchInput={false}
            className='cursor-pointer text-[#333] text-opacity-80'
            activeTab={`border-b bg-gray-50 border-blue-600 text-blue-600 font-semibold`}
        />
        </div>
    </div>
  )
}

export default UserActivitiesDashboard