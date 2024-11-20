import React from 'react'
import { FlexBox, FlexBoxInner, Text } from '../../../../components/common/StyledComponent'
import { RequestNavigation } from '../request-mini-components'
import { Outlet } from 'react-router-dom'
import RequestTabNavigation from '../request-mini-components/RequestTabNavigation'
import WorkflowDashboard from '../request-mini-components/WorkflowDashboard'


const RequestMainPage = () => {
  return (
    <FlexBox className='h-full '>
      <FlexBoxInner className='px-5 py-3 bg-gray-50'>
          <Text className='text-[20px] font-Poppins font-semibold text-text-primary'>
              Approval Workflow
              <span className='block text-[12px] font-normal text-[#333] text-opacity-60'>approval Workflow orkflow page </span>
          </Text>
      </FlexBoxInner>
      <FlexBox className='mx-1 h-full'>
        <WorkflowDashboard /> 
        <Outlet />
      </FlexBox>
    </FlexBox>
  )
}

export default RequestMainPage