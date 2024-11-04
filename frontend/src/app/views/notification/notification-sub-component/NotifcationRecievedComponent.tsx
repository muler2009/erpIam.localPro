import { useState } from 'react'
import PolicyTable from '../../../../iam/components/Table/PolicyTable'
import { useGetNotificationQuery } from '../../../services/notificationAPISlice'
import useNotificationColumn from '../../../constants/columns/useNotificationColumn'
import NotificationTable from '../notification-table/NotificationTable'
import { FlexBox, Div, Text } from '../../../../components/common/StyledComponent'

const NotifcationRecievedComponent = () => {
    const [params, setParams] = useState({ page: 2, limit: 20});
    const {data: userNotification, isSuccess, error, isLoading} = useGetNotificationQuery() 
    const {notificationColumn} = useNotificationColumn()
    // const {data} = useGetNotificationQuery()
  return (
    <FlexBox className='pt-5 px-5 notification'>
        <NotificationTable 
            data={userNotification || []}
            columns={notificationColumn}
        />

          {
            // Display error or no data messages as needed
            error ? (
                <Div className="flex flex-col items-center gap-2">
                    <Text className="font-IBMPlexSans font-semibold text-[20px] text-red-800">
                        {(error as any)?.data?.message || "Error fetching policies!"}
                    </Text>
                    <p className="text-[12px] text-[#333] text-opacity-60">No Notification currently</p>
                </Div>
            ) : (
                isSuccess && userNotification?.length === 0 && (
                    // Show message when no policies are available
                    <p>No Notification available</p>
                )
            )
        }

      
    </FlexBox>
  )
}

export default NotifcationRecievedComponent