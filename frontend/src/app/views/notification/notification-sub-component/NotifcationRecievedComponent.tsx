import { useState } from 'react'
import PolicyTable from '../../../../iam/components/Table/PolicyTable'
import { useGetNotificationQuery, useMarkAsReadNotificationMutation } from '../../../services/notificationAPISlice'
import useNotificationColumn from '../../../constants/columns/useNotificationColumn'
import NotificationTable from '../notification-table/NotificationTable'
import { FlexBox, Div, Text } from '../../../../components/common/StyledComponent'
import { Outlet } from 'react-router-dom'
import NotificationDetailComponent from './NotificationDetailComponent'
import useNotification from '../../../hooks/useNotification'


const NotifcationRecievedComponent = () => {
    const {data: notification, isSuccess, error, isLoading} = useGetNotificationQuery() 
    const {notificationColumn} = useNotificationColumn()
    const {selectedNotification, setSelectedNotification, handleBackClick, handleNotificationClick} = useNotification(notification ?? [])
    
  return (
    <FlexBox className="mt-1 notification h-full">
      {
        // Step 2: Display Details of Selected Notification
        selectedNotification ? (
          <NotificationDetailComponent
            handleBackClick={handleBackClick}
            selectedNotification={selectedNotification}
          
          />
      ) : (
        // Step 3: Display Table When No Notification is Selected
        <>
          <NotificationTable
            data={notification || []}
            columns={notificationColumn}
            handleNotificationClick={handleNotificationClick} // Pass handler to table
          />
          {
            error ? (
              <Div className="flex flex-col items-center gap-2">
                <Text className="font-IBMPlexSans font-semibold text-[20px] text-red-800">
                   {(error as any)?.data?.message || "Error fetching notifications!"}
                </Text>
                <p className="text-[12px] text-[#333] text-opacity-60">No Notifications currently</p>
              </Div>
            ) : (
              isSuccess && notification?.length === 0 && (
                <p>No Notifications available</p>
              )
            )
        }
        </>
      )}
      <Outlet />
    </FlexBox>
  );
};

export default NotifcationRecievedComponent