import React from 'react'
import { FlexBoxInner, FlexOuterContainer, Text } from '../../../components/common/StyledComponent'
import DashboardHeader from './dashboard-sub-components/DashboardHeader'
import DashboardCard from './dashboard-sub-components/DashboardCard'
import { FlexBox } from '../../../iam/components/reusable/StyledComponent'
import DashboardChart from './dashboard-sub-components/DashboardChart'
import FolderTable from '../../components/tables/FolderTable'
import LibraryList from '../document-management/LibraryList'

const Dashboard = () => {
  return (
    <FlexOuterContainer className='w-full m-1 flex space-x-1'>
      <FlexBox className='w-2/3 flex flex-col '>
        <DashboardCard />
        <DashboardChart />
        <FlexBoxInner className='flex flex-col mt-1 bg-white '>
          <Text className='font-semibold pt-5 px-5'>Recently Added Documents</Text>
          <LibraryList />
        </FlexBoxInner>
      </FlexBox>
      <FlexBox className='w-1/3 flex flex-col bg-white py-5'>

      </FlexBox>
      {/* <DashboardHeader />
      <DashboardCard /> */}
    </FlexOuterContainer>
  )
}

export default Dashboard