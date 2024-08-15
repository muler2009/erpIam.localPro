import React from 'react'
import { FlexBoxInner, FlexOuterContainer, Text } from '../../../components/common/StyledComponent'
import DashboardHeader from './dashboard-sub-components/DashboardHeader'
import DashboardCard from './dashboard-sub-components/DashboardCard'
import { FlexBox } from '../../../iam/components/reusable/StyledComponent'
import DashboardChart from './dashboard-sub-components/DashboardChart'
import FolderTable from '../../components/tables/FolderTable'
import LibraryList from '../document-management/LibraryList'
import { useGetNotificationQuery } from '../../services/notificationAPISlice'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const {data, isSuccess, isLoading} = useGetNotificationQuery() 
  console.log(data)
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
      <div>
      <h2>Notifications for {data?.user.username}</h2>
      <p>Total Unread Notifications: {data?.total_unread}</p>
      {data?.notifications.length ? (
        data.notifications.map((notification, index) => (
          <div key={index}>
            <p><strong>Message:</strong> {notification.notification_message}</p>
            <p><strong>Received At:</strong> {notification.notification_recieved_at}</p>
            <p><strong>Metadata:</strong> {notification.notification_metadata ? JSON.stringify(notification.notification_metadata) : 'No metadata'}</p>
            <Link className='cursor-pointer hover:underline' to='test_request'>
              <strong>Action Taken:</strong> {notification.action_taken}
            </Link>
            
            {/* Display more fields if necessary */}
          </div>
        ))
      ) : (
        <p>No notifications</p>
      )}
      
    </div>

      </FlexBox>
      {/* <DashboardHeader />
      <DashboardCard /> */}
    </FlexOuterContainer>
  )
}

export default Dashboard