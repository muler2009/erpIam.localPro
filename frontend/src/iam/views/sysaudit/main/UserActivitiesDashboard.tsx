import React from 'react'
import TabNavigation from '../../../../app/components/common/TabNavigation'
import { audit_tab_menu } from '../../managment/constants/iam-menu-items/audit'

const UserActivitiesDashboard = () => {
  return (
    <div className={`w-full font-Poppins`}>
       <div className='flex justify-end items-center py-2 pr-5'>
        <TabNavigation 
            tabs={audit_tab_menu}
            showSearchInput={false}
            className='cursor-pointer text-[#333] text-opacity-80'
            custom='border-b '
            activeTab={`font-semibold text-opacity-100 border-b-[2px] border-b-button-primary pb-2 border-r-none`}
        />
        </div>
    </div>
  )
}

export default UserActivitiesDashboard