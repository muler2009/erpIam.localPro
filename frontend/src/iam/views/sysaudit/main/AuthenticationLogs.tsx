import React from 'react'
import TabNavigation from '../../../../app/components/common/TabNavigation'
import { audit_logs_menu, auth_logs } from '../../managment/constants/iam-menu-items/audit'
import FailedLogDisplayTypeComponent from '../audit-components/FailedLogDisplayTypeComponent'

const AuthenticationLogs = () => {
  return (
    <div className={`w-full `}>
       <div className='flex justify-end items-center py-2 pr-5'>
        <TabNavigation 
            tabs={auth_logs}
            showSearchInput={false}
            className='cursor-pointer text-[#333] text-opacity-80'
            custom='border-b'
            activeTab={`border-b-2 border-blue-600 font-semibold`}
            viewDisplay={true}
        />
        </div>
    </div>
  )
}

export default AuthenticationLogs