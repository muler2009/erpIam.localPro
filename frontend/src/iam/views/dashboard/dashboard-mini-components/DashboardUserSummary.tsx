import React from 'react'
import { useGetAllUsersQuery } from '../../../features/userAPI'
import useUserColumn from '../../managment/constants/columns/useUserColumn'
import UserTable from '../../../components/Table/UserTable'



const DashboardUserSummary = ({className}: {className: string}) => {

    const {data: userData, isSuccess, error} =  useGetAllUsersQuery()
    const { userDashboardColumn } = useUserColumn()

  return (
    <div className={className}>   
        {
            // Check if there is an error and handle it
            error ? (
                // Check if the error is a CustomExceptionForError from your backend
                <div className='flex flex-col items-center mt-[12%]'>
                    <p className='flex justify-center items-center font-IBMPlexSans font-semibold text-[20px]'>
                        {(error as any)?.data?.message || "Error fetching policies!"}
                    </p>
                    <p className='text-[12px] text-[#333] text-opacity-60'>you can create a new model level permission </p>

                </div>
            ) : (
                // Check if the data was successfully fetched and policies are available
                isSuccess && userData?.length > 0 ? (
                    <UserTable 
                        data={userData || []}
                        columns={userDashboardColumn}
                        showSearch={false}
                        tableStyle={`user-dasboard`}
                    />
                  
                ) : (
                    // Show a message when there are no policies available
                    isSuccess && <p>No policies available</p>
                )
            )
        }
    </div>
  )
}

export default DashboardUserSummary