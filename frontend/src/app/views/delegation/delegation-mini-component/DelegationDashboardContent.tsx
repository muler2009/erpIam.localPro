import React from 'react'
import GetAllDelegationHistory from './GetAllDelegationHistory'
import GetAllActiveDelegation from './GetAllActiveDelegation'
import { FlexBox } from '../../../../components/common/StyledComponent'

const DelegationDashboardContent = () => {
  return (
    <FlexBox className='flex flex-col gap-2 mt-1'>
        <GetAllActiveDelegation />
        <GetAllDelegationHistory />
    </FlexBox>
  )
}

export default DelegationDashboardContent