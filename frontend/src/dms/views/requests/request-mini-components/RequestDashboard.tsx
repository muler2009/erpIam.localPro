import React from 'react'
import UnApprovedByOwner from './UnApprovedByOwner'
import RequestTabNavigation from './RequestTabNavigation'
import { FlexBox, FlexBoxInner } from '../../../../components/common/StyledComponent'

const RequestDashboard = () => {
  return (
   <FlexBox className='h-full'>
      <UnApprovedByOwner />
      <RequestTabNavigation /> 
   </FlexBox>
  
  )
}

export default RequestDashboard