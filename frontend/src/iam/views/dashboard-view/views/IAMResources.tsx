import React from 'react'
import { FiRefreshCcw } from "react-icons/fi";
import Tooltip from '../../../components/reusable/Tooltip';
import { useGetGroupsQuery } from '../../../features/groupsAPI';
import { useGetAllRolesQuery } from '../../../features/roleAPI';
import { useGetAllUsersQuery } from '../../../features/userAPI';
import { useGetAllPoliciesQuery } from '../../../features/policiesAPI';
// import { useGetSubGroupsQuery } from '../../../features/groupsAPI';


export interface ResourceNotifierInterface {
    label: string,
    available_number: number
}

const IAMResources = () => {

    const {data: group} = useGetGroupsQuery()
    const {data: users} = useGetAllUsersQuery()
    const {data: policies} = useGetAllPoliciesQuery()
    const {data: total_roles} = useGetAllRolesQuery()
    // const {data: subgroup} = useGetSubGroupsQuery()


    const resources: ResourceNotifierInterface[] = [
        { label: "Users", available_number: users?.length || 0},
        { label: "Groups", available_number:  group?.length || 0 },
        { label: "Roles",  available_number: total_roles?.length || 0 },
        // { label: "SubGroups", available_number: subgroup?.length || 0 },
        { label: "Policies", available_number: policies?.length || 0 }
    ]


  return (
    <div className='flex flex-col gap-2 shadow-sm pb-5 px-2'>
        <div className='mt-10 px-10 flex flex-col '>
            <div className='flex justify-between items-center border-b-[2px] pb-3'>
                <div className='flex flex-col'>
                    <h1 className='font-Rubik font-[600] text-[18px]'>IAM Resources</h1>
                    <p className='font-Poppins text-[13px] text-[#333] text-opacity-50'>Available IAM Resource</p>
                </div>
                <button className='bg-green-600 py-2 px-5 rounded-[4px] text-white cursor-pointer bg-opacity-85'>
                    <Tooltip content={`Refresh`}>
                        <FiRefreshCcw  size={20}/>
                    </Tooltip>
                </button>
            </div>
        
        </div>

        <div className='px-10 flex justify-between space-x-5 pt-6 divide-x-[2px]'>
            {
                resources?.map((resource, index) => (
                    <div key={index} className='pl-5 flex flex-col gap-2'>
                        <h2 className='font-Rubik text-[#333] text-opacity-50 text-[25px]'>{resource.label}</h2>
                        <h1 className='font-Poppins text-[45px] hover:underline text-green-600'>{resource.available_number}</h1>
                       
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default IAMResources
