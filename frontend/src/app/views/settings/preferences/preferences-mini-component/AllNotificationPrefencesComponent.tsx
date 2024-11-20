import React from 'react'
import useNotificationPreferenceSetting from '../../../../constants/columns/useNotificationPreferenceSetting'
import { useGetNotificationPreferenceQuery } from '../../../../services/notificationAPISlice'
import PolicyTable from '../../../../../iam/components/Table/PolicyTable'
import { FlexBox, Div, Text, } from '../../../../../components/common/StyledComponent'

const AllNotificationPrefencesComponent = () => {
    const {data: configuredPrefences, error, isSuccess} = useGetNotificationPreferenceQuery()
    const {notificationPreferenceSettingColumn} = useNotificationPreferenceSetting()
    console.log(configuredPrefences)
  return (
   <FlexBox className='mt-2 h-full flex flex-col justify-center'>   
   {
        // Check if there is an error and handle it
       error ? (
           // Check if the error is a CustomExceptionForError from your backend
           <Div className='flex flex-col items-center gap-2 mt-[12%]'>
               <Text className='flex justify-center items-center font-IBMPlexSans font-semibold text-[20px]'>
                   {(error as any)?.data?.message || "Error fetching policies!"}
               </Text>
               <p className='text-[12px] text-[#333] text-opacity-60'>You haven't set your notification preference</p>
           </Div>
       ) : (
           // Check if the data was successfully fetched and policies are available
           isSuccess && configuredPrefences?.length > 0 ? (
               <Div className='notification-preference'>
                   <PolicyTable 
                       data={configuredPrefences || []}
                       columns={notificationPreferenceSettingColumn}
                       showEntries={false}
                       showSearch={false}
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

export default AllNotificationPrefencesComponent