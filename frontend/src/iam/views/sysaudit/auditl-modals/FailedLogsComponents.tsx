import React from 'react'
import { FailedLogsDetailComponentInterface } from './FailedLogsDetailComponent'
import { AccessFailureLogsInterface } from '../../../models/sys_audit_interface'
import {format} from 'date-fns'

interface FailedLogsDataInterface {
    rowData: AccessFailureLogsInterface
}

export const RequestAndDeviceContext = ({rowData}: FailedLogsDataInterface) => {
  return (
    <div className="flex flex-col space-y-2 text-sm py-2 px-5 text-nowrap font-MonaSans">
         <div className='flex space-x-6 text-[12px]'>
            <div className="w-[20%]">IP Address</div> 
            <div className='leading-5'>{rowData?.ip_address}</div>
        </div>
        <div className='flex space-x-6 text-[12px] '>
            <div className=" w-[20%]">HTTP Accept:</div> 
            <div className='leading-5'>{rowData?.http_accept}</div>
        </div>
        <div className='flex space-x-6 text-[12px]'>
            <div className=" w-[20%]">Date:</div> 
            <div className='leading-5'>{format(rowData?.attempt_time, 'EEEE, MMM dd yyyy')}</div>
        </div>
        <div className='flex space-x-6 text-[12px]'>
            <div className=" w-[20%]">Failed:</div> 
            <div className='leading-5'>{rowData?.failure_count}</div>
        </div>
        <div className='flex space-x-6 text-[12px]'>
            <div className=" w-[20%]">User Agent:</div> 
            <div className='leading-5  text-wrap pl-8'>{rowData?.user_agent}</div>
        </div>
        
     </div>
  )
}


export const FailedIdentityInformation = ({rowData}: FailedLogsDataInterface) => {
    return (
        <div className="flex flex-col space-y-2 text-sm bg-[#fff] pt-2 pb-4 px-5 font-MonaSans"> 
            <div className='flex space-x-10 text-[12px]'>
                <div className="w-[12%]">UserID:</div> 
                <div className='pl-5'>{rowData?.user_info?.user_id || "NOT_FOUND"}</div>
            </div>
            <div className='flex space-x-10 text-[12px]'>
                <div className="w-[12%]">Username:</div> 
                <div className='pl-5 leading-2'>{rowData?.user_info.username || "NOT_FOUND"}</div>
            </div>
            <div className='flex space-x-10 text-[12px]'>
                <div className="w-[12%]">email:</div> 
                <div className='pl-5 leading-2'>{rowData?.user_info?.email || "NOT_FOUND"}</div>
            </div>
        
            <div className='flex space-x-10 text-[12px]'>
                <div className="w-[12%]">superuser:</div> 
                <div className='pl-5 leading-2'>{rowData?.user_info?.is_superuser ? "true" : "false"}</div>
            </div> 
        </div>
    )
  }


export const FailesEventLogs = ({rowData}: FailedLogsDataInterface) => {
    return (
        <div className="flex flex-col space-y-2 text-sm py-2 px-5 font-MonaSans"> 
            <div className='flex space-x-2 text-[12px]'>
                <div className="w-[20%]">type:</div> 
                <div className='pl-5'>{rowData?.event?.type || "NOT_FOUND"}</div>
            </div>
            <div className='flex space-x-2 text-[12px]'>
                <div className="w-[20%]">status:</div> 
                <div className='pl-5 leading-2'>{rowData?.event?.status || "NOT_FOUND"}</div>
            </div>
            <div className='flex space-x-2 text-[12px]'>
                <div className="w-[20%]">reason:</div> 
                <div className='pl-5 leading-2 text-red-500 font-semibold'>
                    <p className='border px-4 py-1 rounded-full bg-red-600 text-teal-50'>{rowData?.event?.reason || "NOT_FOUND"}</p>
                </div>
            </div>        
        </div>    
    )
}


export const FailesRisktLogs = ({rowData}: FailedLogsDataInterface) => {
    return (
        <div className="flex flex-col space-y-2 text-sm py-2 px-5 "> 
            <div className='flex space-x-2 text-[12px]'>
                <div className="font-medium text-[#00bcf2] w-[20%]">anomaly_detected:</div> 
                <div className='pl-5'>{rowData?.risk?.login_anomaly_detected || "NOT_FOUND"}</div>
            </div>
            <div className='flex space-x-2 text-[12px]'>
                <div className="font-medium text-[#00bcf2] w-[20%]">risk_score:</div> 
                <div className='pl-5 leading-2'>{rowData?.risk?.login_risk_score || "NOT_FOUND"}</div>
            </div>
               
        </div>
    )
}





