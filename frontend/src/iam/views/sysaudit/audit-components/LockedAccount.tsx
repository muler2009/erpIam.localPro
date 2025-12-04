import React from 'react'
import { Input } from '../../../components/reusable'
import useLockedColumn from '../columns/column-hooks/useLockedColumn'
import { useGetLockedAccountQuery } from '../../../features/auditLogsAPI'
import TableComponent from '../../../components/Table/TableComponent'
import useAuditUtils from '../hooks/useAuditUtils'
import { IoLockClosedSharp } from "react-icons/io5";
import { RiCloseCircleFill } from "react-icons/ri";

const LockedAccount = () => { 

  const {data: lockedAccountData, error, isSuccess} = useGetLockedAccountQuery()
  const {lockedAccountColumn} = useLockedColumn()
  const {isArrayOfType} = useAuditUtils()

 
  
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
          isArrayOfType(lockedAccountData) && lockedAccountData.length > 0 ? (
            <TableComponent
              data={lockedAccountData}
              columns={lockedAccountColumn}
              tableStyle={`locked`}
              showEntries={true}
              showSearch={true}
              showPagination={true}
            />
          ) : (
            <div className="flex flex-col justify-center space-x-2">
              <TableComponent
                data={[]}
                columns={lockedAccountColumn}
                tableStyle="locked"
                showEntries={true}
                showSearch={true}
                showPagination={true}
              />
              <div className={`flex flex-col items-center justify-center py-5 h-[30vh] bg-gray-50`}>
                <div className='flex items-center relative text-button-primary'>
                  {IoLockClosedSharp({size: 120})}
                  <span className='absolute top-[50%] left-[35%]'>
                    {RiCloseCircleFill({size:35, className:'text-gray-100'})}
                  </span>
                </div>
                <div className={`flex flex-col justify-center items-center py-2`}>
                  <p className="text-[25px] text-gray-600 font-semibold">{(lockedAccountData as any).status_code}</p>
                  <p className="text-lg font-semibold text-gray-600">{(lockedAccountData as any).message}</p>
                  <p className="text-[12px] text-gray-600">There is no locked account recorded due to failed login!</p>
                </div>
              </div>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
}

export default LockedAccount