import React from 'react'
import '../assets/css/custom.css'

import { Outlet } from 'react-router-dom'
import { FlexOuterContainer } from '../iam/components/reusable/StyledComponent'


export const Layout = () => {
  return (
    <React.Fragment>
        <FlexOuterContainer className="w-screen h-screen overflow-x-hidden">
            <Outlet />
        </FlexOuterContainer> 
    </React.Fragment>
  )
}