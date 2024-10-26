import React from 'react'
import { FlexOuterContainer } from '../../../../components/reusable/StyledComponent'
import RoleNavigationHeader from '../mini-components/RoleNavigationHeader'
import RoleTabNavigation from '../mini-components/RoleTabNavigation'

const RoleDashboard = () => {
  return (
    <FlexOuterContainer className=''>
      <RoleNavigationHeader />
      <RoleTabNavigation />
    </FlexOuterContainer>
  )
}

export default RoleDashboard