import React from 'react'
import { FlexBox, Div, Text } from '../../../../../components/common/StyledComponent'
import useNotificationSetting from '../../constants/columns/useNotificationSetting'
import { useGetNotificationTemplateQuery } from '../../../../features/settingAPI'
import PolicyTable from '../../../../components/Table/PolicyTable'
import NotificationTable from '../../../../../app/views/notification/notification-table/NotificationTable'

const GetAllNotificationTemplate = () => {
    const {data: notificationTemplate, isSuccess, error} = useGetNotificationTemplateQuery()
    const {notificationTemplateColumn} = useNotificationSetting()
  return (
    <FlexBox className='mx-4 mt-2 h-full flex flex-col justify-center'>   
            {
                 // Check if there is an error and handle it
                error ? (
                    // Check if the error is a CustomExceptionForError from your backend
                    <Div className='flex flex-col items-center gap-2 mt-[12%]'>
                        <Text className='flex justify-center items-center font-IBMPlexSans font-semibold text-[20px]'>
                            {(error as any)?.data?.message || "Error fetching policies!"}
                        </Text>
                        <p className='text-[12px] text-[#333] text-opacity-60'>you can create a new model level permission </p>
                    </Div>
                ) : (
                    // Check if the data was successfully fetched and policies are available
                    isSuccess && notificationTemplate?.length > 0 ? (
                        <Div className='policy'>
                            <PolicyTable 
                                data={notificationTemplate || []}
                                columns={notificationTemplateColumn}
                                showEntries={false}
                                showSearch={true}
                            />
                        </Div>
                    ) : (
                        // Show a message when there are no policies available
                        isSuccess && <p>No policies available</p>
                    )
                )
            }
        </FlexBox>
  )
}

export default GetAllNotificationTemplate