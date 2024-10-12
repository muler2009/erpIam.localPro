import React from 'react'
import { PolicyHeader } from './policy-mini-component/PolicyHeader'
import GetAllPoliciesComponent from './policy-mini-component/GetAllPoliciesComponent'
import { Outlet } from 'react-router-dom'
import { FlexBox } from '../../../components/reusable/StyledComponent'

const PolicyDashboard = () => {
  

  return (
    <FlexBox>
      <PolicyHeader />
      {/* <GetAllPoliciesComponent /> */}
      <Outlet />
    </FlexBox>
  )
}

export default PolicyDashboard