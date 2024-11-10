import React from 'react'
import { NotificationAPIResponse, NotificationItemProps } from '../../../models/notification-models'
import { useMarkAsReadNotificationMutation } from '../../../services/notificationAPISlice'

interface NotificationReadActionInterface {
    rowData: NotificationAPIResponse
}

const NotificationReadActionComponent = ({rowData}: NotificationReadActionInterface) => {
    const [ markAsReadNotification ] = useMarkAsReadNotificationMutation();
    const handleNotificationClick = async() => {
      try {
        const response = await markAsReadNotification(rowData.notification_id).unwrap();
      } catch (error) {
        console.error('Failed to mark notification as read:', error);
      }
    };

    return(
        <>
            {
                !rowData.notification_read && 
                    <div className="border-[2px] border-text-primary rounded-[3px] flex justify-center">
                        <p className="px-5" onClick={handleNotificationClick}>Read</p>
                    </div>
            }
        </>
    )
}

export default NotificationReadActionComponent