import React from 'react'
import TableComponent from '../../../components/Table/TableComponent'
import useAccessFailureColumn from '../columns/useAccessFailureColumn'
import { useGetAccessFailureLogsQuery } from '../../../features/auditLogsAPI'

const AccessFailedLogInformation = () => {
    const {data: failureLogsData, isSuccess, error} = useGetAccessFailureLogsQuery()
    const {accessFailureColumn} = useAccessFailureColumn()

   return (
        <div className={``}>
            {
                // Check if there is an error and handle it
                error ? (
                    // Check if the error is a CustomExceptionForError from your backend
                    <div className='flex flex-col items-center gap-2 mt-[12%]'>
                        <h1 className='flex justify-center items-center font-IBMPlexSans font-semibold text-[20px]'>
                            {(error as any)?.data?.message || "Error fetching policies!"}
                        </h1>
                    </div>
                ) : (
                    // Check if the data was successfully fetched and policies are available
                    isSuccess && failureLogsData?.length > 0 ? (
                        <TableComponent 
                            data={failureLogsData || []}
                            columns={accessFailureColumn}
                            tableStyle={`audit`} 
                        /> 
                    ) : (
                        // Show a message when there are no policies available
                        isSuccess && <p>No Login Event Record available</p>
                    )
                )
            }
        </div>
    )
}

export default AccessFailedLogInformation