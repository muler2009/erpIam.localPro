import { useState } from 'react'
import PolicyTable from '../../../../iam/components/Table/PolicyTable'
import { useGetNotificationQuery, useMarkAsReadNotificationMutation } from '../../../services/notificationAPISlice'
import useNotificationColumn from '../../../constants/columns/useNotificationColumn'
import NotificationTable from '../notification-table/NotificationTable'
import { FlexBox, Div, Text } from '../../../../components/common/StyledComponent'
import { Outlet } from 'react-router-dom'
import { NotificationAPIResponse } from '../../../models/notification-models'
import NotificationDetailComponent from './NotificationDetailComponent'

const NotifcationRecievedComponent = () => {
    const [params, setParams] = useState({ page: 2, limit: 20});
    const {data: userNotification, isSuccess, error, isLoading} = useGetNotificationQuery() 
    const {notificationColumn} = useNotificationColumn()
    const [selectedNotification, setSelectedNotification] = useState<NotificationAPIResponse | null>(null);
    const [ markAsReadNotification ] = useMarkAsReadNotificationMutation();


    const handleNotificationClick = async (notification_id: string) => {
        try {
          // Call mutation to mark as read
          await markAsReadNotification(notification_id ).unwrap();
          
          // Optionally, update local state or UI as needed after marking as read
          const selectedNotification = userNotification?.find(notification => notification.notification_id === notification_id);
          setSelectedNotification(selectedNotification || null);
          
        } catch (error) {
          console.error('Failed to mark notification as read:', error);
        }
      };
  
    const handleBackClick = () => {
      setSelectedNotification(null); // Reset to show table again
    };
  return (
    <FlexBox className="mt-1 notification h-full">
      {selectedNotification ? (
        // Step 2: Display Details of Selected Notification
        <NotificationDetailComponent
          handleBackClick={handleBackClick}
          selectedNotification={selectedNotification}
        
        />
      ) : (
        // Step 3: Display Table When No Notification is Selected
        <>
          <NotificationTable
            data={userNotification || []}
            columns={notificationColumn}
            handleNotificationClick={handleNotificationClick} // Pass handler to table
          />
          {error ? (
            <Div className="flex flex-col items-center gap-2">
              <Text className="font-IBMPlexSans font-semibold text-[20px] text-red-800">
                {(error as any)?.data?.message || "Error fetching notifications!"}
              </Text>
              <p className="text-[12px] text-[#333] text-opacity-60">No Notifications currently</p>
            </Div>
          ) : (
            isSuccess && userNotification?.length === 0 && (
              <p>No Notifications available</p>
            )
          )}
        </>
      )}
      <Outlet />
    </FlexBox>
  );
};

export default NotifcationRecievedComponent