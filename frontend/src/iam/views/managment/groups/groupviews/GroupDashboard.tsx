import React from 'react'
import { FlexBox, FlexBoxInner, FlexOuterContainer } from '../../../../components/reusable/StyledComponent'
import GroupTopNavigation from './GroupTopNavigation'
import GroupList from './GroupList'
import GroupChart from './GroupChart'
import GroupDashboardCharts from './GroupDashboardCharts'
import IAMLineChart from '../../../dashboard/dashboard-mini-components/IAMLineChart'
import DashboardChart from '../../../dashboard/dashboard-mini-components/DashboardChart'

const GroupDashboard = () => {
  return (
    <FlexOuterContainer>
        <GroupTopNavigation />
        <GroupList />
        <GroupDashboardCharts />
    </FlexOuterContainer>
  )
}

export default GroupDashboard