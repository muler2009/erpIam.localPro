import React, {useState} from 'react'
import { NotificationAPIResponse } from '../models/notification-models';
import { useMarkAsReadNotificationMutation } from '../services/notificationAPISlice';


const useNotification = (notification: NotificationAPIResponse[] | undefined) => {

    const [selectedNotification, setSelectedNotification] = useState<NotificationAPIResponse | null>(null);
    const [ markAsReadNotification ] = useMarkAsReadNotificationMutation();
    const handleNotificationClick = async (notification_id: string) => {
        try {
          // Call mutation to mark as read
          await markAsReadNotification(notification_id ).unwrap();
          // Optionally, update local state or UI as needed after marking as read
          const selectedNotification = notification?.find((notification: any) => notification.notification_id === notification_id);
          setSelectedNotification(selectedNotification || null);
          
        } catch (error) {
          console.error('Failed to mark notification as read:', error);
        }
      };
  
    const handleBackClick = () => {
      setSelectedNotification(null); // Reset to show table again
    };





  return {
    selectedNotification,
    setSelectedNotification,
    handleNotificationClick, 
    handleBackClick
  }
}

export default useNotification