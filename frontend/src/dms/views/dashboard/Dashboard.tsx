import {FlexBox, FlexBoxInner } from '../../../components/common/StyledComponent'
import LibraryList from '../document-management/LibraryList'
import DashboardChart from './dashboard-sub-components/DashboardChart'
import DashboardRecentActivity from './dashboard-sub-components/DashboardRecentActivity'
import DashboardStateStastics from './dashboard-sub-components/DashboardStateStastics'
import DashboardSystemUsage from './dashboard-sub-components/DashboardSystemUsage'
import NotificationDashboard from './dashboard-sub-components/NotificationDashbord'
import UserRole from './dashboard-sub-components/UserRole'

const Dashboard = () => {
  return (
    <FlexBox className='w-full h-full bg-white py-1 flex'>
      <FlexBoxInner className='mx-1 w-2/3 '>
        <FlexBoxInner className='flex flex-col gap-2'>
          <DashboardSystemUsage />
          <FlexBoxInner className='flex space-x-2'>
            <DashboardChart />
            <DashboardStateStastics />
          </FlexBoxInner>
          <LibraryList />
          {/* <DashboardSystemUsage /> */}
        </FlexBoxInner>
      </FlexBoxInner>
      <FlexBoxInner className='flex flex-col w-1/3 mr-1 gap-2'>
        <DashboardRecentActivity />
        <UserRole />
      </FlexBoxInner>
    </FlexBox>
  )
}

export default Dashboard




//  <FlexOuterContainer className='w-full m-1 flex space-x-1'>
//       <FlexBox className='w-2/3 flex flex-col '>
//         <DashboardCard />
//         <DashboardChart />
//         <FlexBoxInner className='flex flex-col mt-1 bg-white '>
//           <Text className='font-semibold pt-5 px-5'>Recently Added Documents</Text>
//           <LibraryList />
//         </FlexBoxInner>
//       </FlexBox>
//       <FlexBox className='w-1/3 flex flex-col bg-white py-5'>
//       <div>
//       <h2>Notifications for {data?.user.username}</h2>
//       <p>Total Unread Notifications: {data?.total_unread}</p>
//       {data?.notifications.length ? (
//         data.notifications.map((notification, index) => (
//           <div key={index}>
//             <p><strong>Message:</strong> {notification.notification_message}</p>
//             <p><strong>Received At:</strong> {notification.notification_recieved_at}</p>
//             <p><strong>Metadata:</strong> {notification.notification_metadata ? JSON.stringify(notification.notification_metadata) : 'No metadata'}</p>
//             <Link className='cursor-pointer hover:underline' to='test_request'>
//               <strong>Action Taken:</strong> {notification.action_taken}
//             </Link>
            
//             {/* Display more fields if necessary */}
//           </div>
//         ))
//       ) : (
//         <p>No notifications</p>
//       )}
      
//     </div>

//       </FlexBox>
//       {/* <DashboardHeader />
//       <DashboardCard /> */}
//     </FlexOuterContainer>