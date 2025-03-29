import React from 'react'
import { Outlet } from 'react-router-dom'
import {  audit_logs_menu } from '../../managment/constants/iam-menu-items/audit'
import HorizontalMenu from '../../../../app/components/common/HorizontalMenu'

const SystemAuditDashboard = () => {
 
  return (
    <div className={`w-full font-Poppins`}>
       <HorizontalMenu 
          menuItems={audit_logs_menu} 
          className={`text-[#333] text-opacity-80`} 
          active='bg-blue-300 rounded-t-[5px] duration-700 transition ease-in-out'
        />
       <Outlet />
    </div>
  )
}

export default SystemAuditDashboard

