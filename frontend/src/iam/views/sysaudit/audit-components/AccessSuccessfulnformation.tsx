import React from 'react'
import useAccessLogsColumn from '../columns/useAccessLogsColumn'
import { useGetAccessSuccessLogsQuery } from '../../../features/auditLogsAPI'
import TableComponent from '../../../components/Table/TableComponent'

const AccessSuccessfulnformation = () => {
    const {data: successLogsData, error, isSuccess} = useGetAccessSuccessLogsQuery()
    const {accessSuccessLogsColumn} = useAccessLogsColumn()
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
                    isSuccess && successLogsData?.length > 0 ? (
                        <TableComponent 
                            data={successLogsData || []}
                            columns={accessSuccessLogsColumn}
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

export default AccessSuccessfulnformation