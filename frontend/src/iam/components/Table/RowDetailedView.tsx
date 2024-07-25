import React from 'react'
import { ColumnDef } from "@tanstack/react-table";
import { UserAccountInterfacee } from '../../models/user.model'
import { GroupAPIResponse, GroupColumn, GroupMembersInterface } from '../../models/group.model'
import UserTable from './UserTable'
import useUserColumn from '../../submodules/managment/constants/columns/useUserColumn'
import NestedUserTable from './NestedUserTable'
import useNestedColumnForGroupTable from '../../submodules/managment/constants/columns/useNestedColumnForGroupTable';


interface RowDetailedViewProps {
  members: GroupMembersInterface[];
  columns: ColumnDef<GroupMembersInterface, any>[];
}

const RowDetailedView = ({members, columns}: RowDetailedViewProps) => {
    console.log(members)
    const { nestedUserInGroupTable } = useNestedColumnForGroupTable()
  return (
      <NestedUserTable columns={nestedUserInGroupTable} data={members} /> 
  )
}

export default RowDetailedView


