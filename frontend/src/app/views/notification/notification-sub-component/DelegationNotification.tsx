import React from 'react'
import { FlexBox, Div, Text } from '../../../../components/common/StyledComponent'
import NotificationTable from '../notification-table/NotificationTable'
import NotificationDetailComponent from './NotificationDetailComponent'
import useNotification from '../../../hooks/useNotification'
import { useGetDelegationOnlyNotificationQuery } from '../../../services/notificationAPISlice'
import useNotificationColumn from '../../../constants/columns/useNotificationColumn'

const DelegationNotification = () => {

  const {data: delegationOnly, isError, error, isSuccess} = useGetDelegationOnlyNotificationQuery()
  const {notificationColumn} = useNotificationColumn()
  const {selectedNotification, handleBackClick, handleNotificationClick} = useNotification(delegationOnly ?? [])

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
          data={delegationOnly || []}
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
            isSuccess && delegationOnly?.length === 0 && (
              <p>No Notifications available</p>
            )
          )
      }
      </>
    )}
    
  </FlexBox>
  )
}

export default DelegationNotification