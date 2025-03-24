import React from 'react'
import { FlexBox, Text, Div  } from '../../../../../../components/common/StyledComponent'
import { useGetDeactivatedAccountQuery } from '../../../../../features/userAPI'
import useUserColumn from '../../../constants/columns/useUserColumn'
import UserTable from '../../../../../components/Table/UserTable'
import PolicyTable from '../../../../../components/Table/PolicyTable'

const GetDeactivatedAccountsComponent = () => {
    const { data: deactivatedAccount, error, isSuccess } = useGetDeactivatedAccountQuery()
    const {userDashboardColumn} = useUserColumn()
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
                        <p className='text-[12px] text-[#333] text-opacity-60'>you can create a new model level permission </p>
                       
        
                    </Div>
                ) : (
                    // Check if the data was successfully fetched and policies are available
                    isSuccess && deactivatedAccount?.length > 0 ? (
                        <UserTable 
                            data={deactivatedAccount || []}
                            columns={userDashboardColumn}
                            showSearch={true}
                            tableStyle={`user-dasboard`}
                        />
                    ) : (
                        // Show a message when there are no policies available
                        isSuccess && <p>Empty</p>
                    )
                )
            }
      </FlexBox>
      )
}

export default GetDeactivatedAccountsComponent