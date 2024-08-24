import React from 'react'
import RequestNavigation from './request-mini-components/RequestNavigation'
import { FlexBox } from '../../../components/common/StyledComponent'
import { Outlet } from 'react-router-dom'


const RequestMainPage = () => {
  return (
    <>
        <RequestNavigation />
        <FlexBox className='mx-1'>
            <Outlet />
        </FlexBox>
    
    </>
  )
}

export default RequestMainPage