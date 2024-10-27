import React from 'react'
import RequestNavigation from './request-mini-components/RequestNavigation'
import { FlexBox } from '../../../components/common/StyledComponent'
import { Outlet } from 'react-router-dom'


const RequestMainPage = () => {
  return (
    <FlexBox className='h-full'>
        <RequestNavigation />
        <FlexBox className='mx-1 h-full'>
            <Outlet />
        </FlexBox>
    
    </FlexBox>
  )
}

export default RequestMainPage