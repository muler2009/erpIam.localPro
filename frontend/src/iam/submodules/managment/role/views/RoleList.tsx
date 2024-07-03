import React from 'react'
import RoleTableStructure from '../../../../components/common/RoleTableStructure'
import { data1, columns } from '../../../../constants/columns'
import {ROLE_COLUMNS} from '../../constants/columns/roleColumns'
import { useGetRolesQuery } from '../../../../features/roleAPI'

const RoleList = () => {
  const { data, isSuccess, isLoading} = useGetRolesQuery()
  const roleData = data || []
  return (
    <div className='role'>
        <RoleTableStructure
            columns={ROLE_COLUMNS}
            data={roleData}
        />
    </div>
  )
}

export default RoleList
