import React from 'react'
import { FlexBox, FlexBoxInner, FlexOuterContainer } from '../../../../components/reusable/StyledComponent'
import GroupTopNavigation from './GroupTopNavigation'
import GroupList from './GroupList'
import GroupChart from './GroupChart'

const GroupDashboard = () => {
  return (
    <FlexOuterContainer>
        <GroupTopNavigation />
        <GroupList />
        <GroupList />     
    </FlexOuterContainer>
  )
}

export default GroupDashboard