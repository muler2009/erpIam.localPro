import React from 'react'
import ClientMenu from './ClientMenu'
import { FlexBox } from '../../../../components/common/StyledComponent'
import { Outlet } from 'react-router-dom'
import { ClientRoutesConf } from '../../../Routes/Routes'

const ClientNavigation = () => {
  return (
    <>
        <ClientMenu />
        <FlexBox>
            <Outlet />
            <ClientRoutesConf />
        </FlexBox>
    
    </>
  )
}

export default ClientNavigation