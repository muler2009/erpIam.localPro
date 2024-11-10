import React from 'react'
import { FlexBox, FlexBoxInner, Text } from '../../../../components/common/StyledComponent'
import { TbDots } from "react-icons/tb";
import { BsBellFill } from "react-icons/bs";
import NotificationTabNavigation from './NotificationTabNavigation';
import { useGetNotificationQuery } from '../../../services/notificationAPISlice';
import NotifcationRecievedComponent from './NotifcationRecievedComponent';
import { Outlet } from 'react-router-dom';

const NotificationListComponent = () => {
 const {data} = useGetNotificationQuery()
 const notificationData = data || []
 const notificationUnread = notificationData?.filter(notification => notification.notification_read === false)


  return (
    <FlexBox className='mt-5 bg-[#f9f9f9] h-full mx-1 rounded-t-[5px]'>
        <FlexBoxInner className='flex justify-between items-center py-4 bg-[#eeeeee] px-5 rounded-t-[5px]'>
            <Text className='text-black font-semibold font-Poppins flex'>
               <BsBellFill size={20}/>
                <span className='pl-3'>
                    Notification Message
                <span className='pl-3 font-normal font-Poppins text-[12px] underline text-'>{notificationUnread.length} unread</span></span>
            </Text>
            <TbDots />
        </FlexBoxInner>
        <NotifcationRecievedComponent /> 
    </FlexBox>
  )
}

export default NotificationListComponent

