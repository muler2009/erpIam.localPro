import React from 'react'
import { FlexOuterContainer } from '../../../../components/reusable/StyledComponent'
import UserNavigationHeader from './user-mini-components/UserNavigationHeader'
import UserTabNavigation from './user-mini-components/UserTabNavigation'

const UserDashboard = () => {
  return (
    <>
        <UserNavigationHeader />
        <UserTabNavigation />
    </>
  )
}

export default UserDashboard