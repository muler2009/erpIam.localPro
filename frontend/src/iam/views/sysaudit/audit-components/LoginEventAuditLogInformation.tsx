import React from 'react'
import UserTable from '../../../components/Table/UserTable'
import { useGetLoginAuditLogsQuery } from '../../../features/auditLogsAPI'
import useLoginAuditColumn from '../columns/useLoginAuditColumn'
import TableComponent from '../../../components/Table/TableComponent'


const LoginEventAuditLogInformation = () => {
    const {data: audit_login_event, isSuccess, error, isLoading} = useGetLoginAuditLogsQuery()
    const {loginEventColumn} = useLoginAuditColumn()

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
                    isSuccess && audit_login_event?.length > 0 ? (
                        <TableComponent 
                            data={audit_login_event || []}
                            columns={loginEventColumn}
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

export default LoginEventAuditLogInformation