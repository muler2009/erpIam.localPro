import { useGetAllUsersQuery } from '../../../../features/userAPI'
import UserTable from '../../../../components/Table/UserTable'
import useUserColumn from '../../constants/columns/useUserColumn'
import { FlexBox, Text, Div  } from '../../../../../components/common/StyledComponent'


const GetAlLUserListComponent = () => {    
 const {data: userData, isLoading, isError, isSuccess, error} = useGetAllUsersQuery()
 const { userColumns } = useUserColumn()
    
return (
    <FlexBox className='mt-2 h-full flex flex-col justify-center'>   
    {
        // Check if there is an error and handle it
        error ? (
            // Check if the error is a CustomExceptionForError from your backend
            <Div className='flex flex-col items-center mt-[12%]'>
                <Text className='flex justify-center items-center font-IBMPlexSans font-semibold text-[20px]'>
                    {(error as any)?.data?.message || "Error fetching policies!"}
                </Text>
                <p className='text-[12px] text-[#333] text-opacity-60'>you can create a new model level permission </p>

            </Div>
        ) : (
            // Check if the data was successfully fetched and policies are available
            isSuccess && userData?.length > 0 ? (
                <Div className='policy'>
                    <UserTable 
                        data={userData || []}
                        columns={userColumns}
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


export default GetAlLUserListComponent
