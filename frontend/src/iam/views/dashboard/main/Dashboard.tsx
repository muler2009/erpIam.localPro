import React from 'react'
import {IAMResources, WelcomeComponent} from '../dashboard-mini-components'
import DashboardChart from '../dashboard-mini-components/DashboardChart'
import { useGetAllUsersQuery } from '../../../features/userAPI'
import useUserColumn from '../../managment/constants/columns/useUserColumn'
import DashboardUserSummary from '../dashboard-mini-components/DashboardUserSummary'
import UserStatusChart from '../dashboard-mini-components/UserStatusChart'



const Dashboard = () => {
  const {data: userData, isLoading, isError, isSuccess, error} = useGetAllUsersQuery()
  const { userColumns } = useUserColumn()
  return (
    <div className={`flex flex-col bg-gray-50 h-full`}>
      <WelcomeComponent />
      <div className={`flex space-x-1 mt-2`}>
          <DashboardChart />
          <IAMResources />
      </div>
      <div className={`flex space-x-1`}>
        <DashboardUserSummary className={`w-3/4 pl-2`} />
        <div className='w-1/4 bg-white  px-2 py-5 flex flex-col'>
          <UserStatusChart className={`border`} />


        </div>
      </div>
     
     
    </div>

      

    
  )
}

export default Dashboard
