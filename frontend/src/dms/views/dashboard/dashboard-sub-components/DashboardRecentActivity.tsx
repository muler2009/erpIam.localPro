import React, {useState} from 'react'
import { FlexBox, FlexBoxInner, Text } from '../../../../components/common/StyledComponent'
import NotificationTabNavigation from '../../notification/notification-sub-component/NotificationTabNavigation'
import { Link } from 'react-router-dom'
import { IoNotificationsOutline } from "react-icons/io5";
import { useGetNotificationQuery } from '../../../services/notificationAPISlice';


const DashboardRecentActivity = () => {

  const [params, setParams] = useState({ page: 1, limit: 10 });
  const {data, isSuccess, error, isLoading} = useGetNotificationQuery(params) 
  const notifications = data || [];  // Adjust based on your API response structure
  const unreadCount = Array.isArray(notifications) ? notifications.filter(notification => !notification.notification_read).length : 0;

  return (
    <FlexBox className='bg-white border rounded-[3px] h-[50vh] overflow-y-scroll sticky top-[7%]'>
      <FlexBoxInner className='pt-3 flex justify-between items-center space-x-4  flex-grow '>
          <FlexBoxInner className='pr-10 relative'>
            <Text className='font-IBMPlexSans font-semibold flex-grow whitespace-nowrap px-5 text-[#333] text-opacity-65'>Approval Notification</Text> 
              {
                unreadCount !== 0 && (
                  <div className='absolute -top-1 left-[75%] bg-red-600 rounded-[5px] px-2 flex justify-center items-center'>
                    <Link to='request' className='font-IBMPlexSans font-semibold flex-grow whitespace-nowrap text-[10px] flex justify-center text-white'>{unreadCount}</Link> 
                  </div>
                )
              }
          </FlexBoxInner>   
          <FlexBoxInner className='pr-4'>
              <Text className='text-[12px] font-semibold text-blue-500'>Unseen Request ({unreadCount})</Text>  
          </FlexBoxInner>
      </FlexBoxInner>
      <FlexBoxInner className=''>
        <NotificationTabNavigation />
      </FlexBoxInner>    
</FlexBox>
  )
}

export default DashboardRecentActivity