import React from 'react'
import { Outlet } from 'react-router-dom'
import {  audit_logs_menu } from '../../managment/constants/iam-menu-items/audit'
import HorizontalMenu from '../../../../app/components/common/HorizontalMenu'
import LoginStasticsChart from '../audit-components/LoginStasticsChart'

const SystemAuditDashboard = () => {
 
  return (
    <div className={`w-full font-Poppins pb-5`}>
       {/* <HorizontalMenu 
          menuItems={audit_logs_menu} 
          className={`text-[#333] text-opacity-80`} 
          active='bg-button-primary text-[#fff] rounded-[3px] duration-700 transition ease-in-out '
        />
       <Outlet /> */}
       <LoginStasticsChart />
    </div>
  )
}

export default SystemAuditDashboard

