import React, {useState} from 'react'
import { FlexBox, FlexBoxInner, P,Text } from '../../../../components/common/StyledComponent'
import { Link } from 'react-router-dom'
import { useMarkAsReadNotificationMutation } from '../../../services/notificationAPISlice'
import { format } from 'date-fns'
import { TfiTrash } from "react-icons/tfi";
import { useGetNotificationQuery } from '../../../services/notificationAPISlice'
import { NotificationItemProps, NotificationAPIResponse } from '../../../models/notification-models'

const NotificationList = ({notification, unreadCount}: NotificationItemProps) => {
 
//  const { data, isSuccess, error } = useGetNotificationQuery(para)
 const [ markAsReadNotification ] = useMarkAsReadNotificationMutation();
  const handleNotificationClick = async () => {
    try {
      const response = await markAsReadNotification(notification.notification_id).unwrap();
      console.log(notification.notification_id)
      console.log('Notification marked as read');
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

   const notificationContent = (
    <FlexBox 
        className={`flex justify-between space-x-7 px-5 py-4 mb-1 hover:bg-gray-100 ${notification.notification_read ? 'bg-white' : 'bg-sky-100'}`} 
        onClick={handleNotificationClick}
      >
        <FlexBoxInner className="flex flex-col gap-1">
          <P className="capitalize font-semibold">{notification.notification_recepient}</P>
          <P>{format(notification.notification_recieved_at || new Date(), 'EE, dd, yyyy')}</P>
        </FlexBoxInner>
      
        <FlexBoxInner className="flex-grow">
          <P>{notification.notification_message} {notification.notification_metadata ? JSON.stringify(notification.notification_metadata) : 'No metadata'}</P> 
          <P>{notification.notification_recieved_at}</P>                
        </FlexBoxInner>
      
        <FlexBoxInner className="invisible hover:visible group-hover:visible flex items-center">   
            <FlexBox className='w-10 h-10 rounded-full hover:bg-red-400 text-white flex items-center justify-center' onClick={() => alert(`${notification.notification_id}`)}>
              <TfiTrash size={20} />
            </FlexBox>       
        </FlexBoxInner>
    </FlexBox>
   )


  return (
    <FlexBox className='bg-white border-b hover:bg-gray-50 group'>  
      <FlexBoxInner className='px-1 cursor-pointer'>
        {
          notification.notification_read ? (
            <>{notificationContent}</>
          ) : (
            <Link to='request' onClick={handleNotificationClick}>
              {notificationContent}
            </Link>
          )
        }  
      </FlexBoxInner>  
    </FlexBox>
  )
}

export default NotificationList




