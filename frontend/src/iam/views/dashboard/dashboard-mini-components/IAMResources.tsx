import React from 'react'
import { FiRefreshCcw } from "react-icons/fi";
import Tooltip from '../../../components/reusable/Tooltip';
import { useGetGroupsQuery } from '../../../features/groupsAPI';
import { useGetAllRolesQuery } from '../../../features/roleAPI';
import { useGetAllUsersQuery } from '../../../features/userAPI';
import { useGetAllPoliciesQuery, useGetAllCustomManagedPolicesQuery } from '../../../features/policiesAPI';
// import { useGetSubGroupsQuery } from '../../../features/groupsAPI';
import { Text } from '../../../components/reusable/StyledComponent';
import IAMUserResourceCard from './IAMUserResourceCard';
import IAMRolesCard from './IAMRolesCard';
import { ResponsiveContainer } from 'recharts';
import IAMLineChart from './IAMLineChart';
import IAMPolicyGroupCard from './IAMPolicyGroupCard';


export interface ResourceNotifierInterface {
    label: string,
    available_number: number
}

const IAMResources = () => {

    const {data: group} = useGetGroupsQuery()
    const {data: users} = useGetAllUsersQuery()
    const {data: policies} = useGetAllCustomManagedPolicesQuery()
    const {data: total_roles} = useGetAllRolesQuery()
    // const {data: subgroup} = useGetSubGroupsQuery()

    const available_user = users?.length || 0;
    const total_role = total_roles?.length || 0;

  return (
    <div className='border rounded-md py-2 px-2 flex flex-col space-y-3 w-full bg-white'>
        <div className={`flex justify-between items-center`}>
            <div className='px-3 py-2'>
                <Text className='font-Poppins font-semibold text-text-primary text-opacity-50 pb-1'>IAM Resources</Text>
            </div>
        </div>
        <div className='flex flex-col space-y-1'>
            <div className={`flex space-x-3`}>
                <div className='flex-1'>
                    <IAMUserResourceCard totalUser={available_user} />
                </div>
                <div className='flex-1'>
                    <IAMRolesCard totalRoles={total_role} />
                </div>
            </div>
            <div className={`flex`}>
                <IAMPolicyGroupCard />
                <div className='flex-grow'>
                    <IAMLineChart />
                </div>
              

            </div>
        </div>
      
    </div>
  )
}

export default IAMResources



