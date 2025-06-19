import React from 'react'
import { FailedLogsDetailComponentInterface } from './FailedLogsDetailComponent'
import { AccessFailureLogsInterface } from '../../../models/sys_audit_interface'

interface FailedLogsDataInterface {
    data: AccessFailureLogsInterface
}

export const RequestAndDeviceContext = ({data}: FailedLogsDataInterface) => {
  return (
    <div className="flex flex-col space-y-2 text-sm text-[#fff] py-2 px-5">
         <div className='flex space-x-6 text-[12px]'>
            <div className="font-medium text-[#00bcf2] w-[15%]">IP Address</div> 
            <div className='leading-5'>{data?.ip_address}</div>
        </div>
        <div className='flex space-x-6 text-[12px]'>
            <div className="font-medium text-[#00bcf2] w-[15%]">HTTP Accept:</div> 
            <div className='leading-5'>{data?.http_accept}</div>
        </div>
        <div className='flex space-x-6 text-[12px]'>
            <div className="font-medium text-[#00bcf2] w-[15%]">Date:</div> 
            <div className='leading-5'>{data?.attempt_time}</div>
        </div>
        <div className='flex space-x-6 text-[12px]'>
            <div className="font-medium text-[#00bcf2] w-[15%]">Failed:</div> 
            <div className='leading-5'>{data?.failure_count}</div>
        </div>
        <div className='flex space-x-6 text-[12px]'>
            <div className="font-medium text-[#00bcf2] w-[15%]">User Agent:</div> 
            <div className='leading-5'>{data?.user_agent}</div>
        </div>
        
     </div>
  )
}


export const FailedIdentityInformation = ({data}: FailedLogsDataInterface) => {
    return (
        <div className="flex flex-col space-y-2 text-sm text-[#fff] pt-2 pb-4 px-5 "> 
            <div className='flex space-x-6 text-[12px]'>
                <div className="font-medium text-[#00bcf2] w-[7%]">UserID:</div> 
                <div className='pl-5'>{data?.user_info?.user_id || "NOT_FOUND"}</div>
            </div>
            <div className='flex space-x-6 text-[12px]'>
                <div className="font-medium text-[#00bcf2] w-[7%]">Username:</div> 
                <div className='pl-5 leading-2'>{data?.user_info.username || "NOT_FOUND"}</div>
            </div>
            <div className='flex space-x-6 text-[12px]'>
                <div className="font-medium text-[#00bcf2] w-[7%]">email:</div> 
                <div className='pl-5 leading-2'>{data?.user_info?.email || "NOT_FOUND"}</div>
            </div>
        
            <div className='flex space-x-6 text-[12px]'>
                <div className="font-medium text-[#00bcf2] w-[7%]">superuser:</div> 
                <div className='pl-5 leading-2'>{data?.user_info?.is_superuser ? "true" : "false"}</div>
            </div> 
        </div>
    )
  }


export const FailesEventLogs = ({data}: FailedLogsDataInterface) => {
    return (
        <div className="flex flex-col space-y-2 text-sm text-[#fff] py-2 px-5 "> 
            <div className='flex space-x-2 text-[12px]'>
                <div className="font-medium text-[#00bcf2] w-[7%]">type:</div> 
                <div className='pl-5'>{data?.event?.type || "NOT_FOUND"}</div>
            </div>
            <div className='flex space-x-2 text-[12px]'>
                <div className="font-medium text-[#00bcf2] w-[7%]">status:</div> 
                <div className='pl-5 leading-2'>{data?.event?.status || "NOT_FOUND"}</div>
            </div>
            <div className='flex space-x-2 text-[12px]'>
                <div className="font-medium text-[#00bcf2] w-[7%]">reason:</div> 
                <div className='pl-5 leading-2'>{data?.event?.reason || "NOT_FOUND"}</div>
            </div>        
        </div>    
    )
}


export const FailesRisktLogs = ({data}: FailedLogsDataInterface) => {
    return (
        <div className="flex flex-col space-y-2 text-sm text-[#fff] py-2 px-5 "> 
            <div className='flex space-x-2 text-[12px]'>
                <div className="font-medium text-[#00bcf2] w-[7%]">anomaly_detected:</div> 
                <div className='pl-5'>{data?.risk?.login_anomaly_detected || "NOT_FOUND"}</div>
            </div>
            <div className='flex space-x-2 text-[12px]'>
                <div className="font-medium text-[#00bcf2] w-[7%]">risk_score:</div> 
                <div className='pl-5 leading-2'>{data?.risk?.login_risk_score || "NOT_FOUND"}</div>
            </div>
               
        </div>
    )
}





