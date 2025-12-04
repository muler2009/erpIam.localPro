import React from 'react'
import { Outlet } from 'react-router-dom'
import { FlexBox, FlexBoxInner, Text } from '../../../../components/common/StyledComponent'
import { TbDots } from "react-icons/tb";
import { BsBellFill } from "react-icons/bs";
import { useGetNotificationQuery } from '../../../services/notificationAPISlice';
import TabNavigation from '../../../components/common/TabNavigation';
import { notification_item } from '../../../constants/menu-items/notification-menu';


const NotificationDashboard = () => {
  const {data} = useGetNotificationQuery() 
  const notificationData = data || []
  const notificationUnread = notificationData?.filter(notification => notification.notification_read === false)
  return (
    <FlexBox className='bg-[#f9f9f9] h-full mx-1 rounded-t-[5px]'>
      <FlexBoxInner className='flex justify-between items-center py-4 bg-[#eeeeee] px-5 rounded-t-[5px]'>
        <Text className='text-black font-semibold font-Poppins flex'>
          {
            BsBellFill({
              size: 20
            })

          }
            <Text className='pl-3'>Notification Message
              <span className='pl-3 font-Poppins text-[12px] text-button-primary font-semibold'>{notificationData.length} Notification</span>
            </Text>
        </Text>
        {
          TbDots({})
        }
      </FlexBoxInner>
      <TabNavigation 
        tabs={notification_item}
        showSearchInput={true}
        className='cursor-pointer text-[#333] text-opacity-50 py-[5px]'
        custom='border-b  px-5'
        activeTab='font-semibold text-opacity-100 -translate-x py-[5px]'
      />
    </FlexBox>
  )
}

export default NotificationDashboard