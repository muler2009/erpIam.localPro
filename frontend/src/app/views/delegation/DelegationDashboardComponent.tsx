import React from 'react'
import DelegationHeader from './delegation-mini-component/DelegationHeader'
import { Outlet } from 'react-router-dom'
import GetAllDelegationHistory from './delegation-mini-component/GetAllDelegationHistory'

const DelegationDashboardComponent = () => {
  return (
    <>
        <DelegationHeader />  
        <Outlet />
    </>
  )
}

export default DelegationDashboardComponent