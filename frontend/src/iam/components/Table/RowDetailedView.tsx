import React from 'react'
import { ColumnDef } from "@tanstack/react-table";
import { UserAccountInterfacee } from '../../models/user.model'
import { GroupAPIResponse, GroupColumn, GroupMembersInterface } from '../../models/group.model'
import UserTable from './UserTable'
import useUserColumn, { NESTED_COL } from '../../submodules/managment/constants/columns/useUserColumn'
import NestedUserTable from './NestedUserTable'


interface RowDetailedViewProps {
  members: GroupMembersInterface[];
  columns: ColumnDef<GroupMembersInterface, any>[];
}



const RowDetailedView = ({members, columns}: RowDetailedViewProps) => {
    console.log(members)
    const { userColumns } = useUserColumn()
  return (
      <NestedUserTable columns={NESTED_COL} data={members} /> 
  )
}

export default RowDetailedView


