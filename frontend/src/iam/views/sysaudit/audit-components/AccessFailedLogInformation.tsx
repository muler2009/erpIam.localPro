import React from 'react'
import TableComponent from '../../../components/Table/TableComponent'
import useAccessFailureColumn from '../columns/column-hooks/useAccessFailureColumn'
import { useGetAccessFailureLogsQuery } from '../../../features/auditLogsAPI'
import { AccessFailureLogsAPIResponse, AccessFailureLogsInterface } from '../../../models/sys_audit_interface'

const AccessFailedLogInformation = () => {
    const {data: failureLogsData, isSuccess, error} = useGetAccessFailureLogsQuery()
    const {accessFailureColumn} = useAccessFailureColumn()

      const isAccessFailureLogArray = (
        data: AccessFailureLogsAPIResponse
      ): data is AccessFailureLogsInterface[] => {
        return Array.isArray(data);
      };

   return (

     <div className="flex flex-col space-y-4">
          <div className="px-5">
            {error ? (
              <div className="flex flex-col items-center gap-2 mt-[12%]">
                <h1 className="flex justify-center items-center font-IBMPlexSans font-semibold text-[20px]">
                  {(error as any)?.data?.message || "Error fetching locked accounts!"}
                </h1>
              </div>
            ) : isSuccess ? (
              isAccessFailureLogArray(failureLogsData) && failureLogsData.length > 0 ? (
                <TableComponent 
                    data={failureLogsData || []}
                    columns={accessFailureColumn}
                    tableStyle={`audit`}
                    showEntries={true} 
                    showSearch={true}
                    showPagination={true}
                /> 
              ) : (
                <div className="flex flex-col items-center gap-2 mt-[12%]">
                  <p className="text-lg text-gray-600">
                    {(failureLogsData as any)?.message || "No Locked Accounts"}
                  </p>
                </div>
              )
            ) : null}
          </div>
        </div>
        // <div className={`px-5`}>
        //     {
        //         // Check if there is an error and handle it
        //         error ? (
        //             // Check if the error is a CustomExceptionForError from your backend
        //             <div className='flex flex-col items-center gap-2 mt-[12%]'>
        //                 <h1 className='flex justify-center items-center font-IBMPlexSans font-semibold text-[20px]'>
        //                     {(error as any)?.data?.message || "Error fetching policies!"}
        //                 </h1>
        //             </div>
        //         ) : (
        //             // Check if the data was successfully fetched and policies are available
        //             isSuccess && failureLogsData.length > 0 ? (
        //                 <TableComponent 
        //                     data={failureLogsData || []}
        //                     columns={accessFailureColumn}
        //                     tableStyle={`audit`}
        //                     showEntries={true} 
        //                     showSearch={true}
        //                     showPagination={true}
        //                 /> 
        //             ) : (
        //                 // Show a message when there are no policies available
        //                 isSuccess && <p>No Login Event Record available</p>
        //             )
        //         )
        //     }
        // </div>
    )
}

export default AccessFailedLogInformation