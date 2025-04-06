import React from 'react'
import TabNavigation from '../../../../app/components/common/TabNavigation'
import { audit_logs_menu, auth_logs } from '../../managment/constants/iam-menu-items/audit'

const AuthenticationLogs = () => {
  return (
    <div className={`w-full font-Poppins`}>
       <div className='flex justify-end items-center py-2 pr-5'>
        <TabNavigation 
            tabs={auth_logs}
            showSearchInput={false}
            className='cursor-pointer text-[#333] text-opacity-80'
            custom='border-b '
            activeTab={`font-semibold text-opacity-100 border-b-[2px] border-b-button-primary pb-2 border-r-none`}
        />
        </div>
    </div>
  )
}

export default AuthenticationLogs