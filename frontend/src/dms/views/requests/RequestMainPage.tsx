import React from 'react'
import { RequestHeadLink } from './request-mini-components'
import RequestNavigation from './request-mini-components/RequestNavigation'
import { FlexBox } from '../../../components/common/StyledComponent'
import { Outlet } from 'react-router-dom'

const RequestMainPage = () => {
  return (
    <>
        <RequestNavigation />
        <FlexBox className='pt-3 bg-white mx-1 h-full'>
            <Outlet />
        </FlexBox>
    
    </>
  )
}

export default RequestMainPage