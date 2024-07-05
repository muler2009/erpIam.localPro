import React, {useState} from 'react'
// import { useReactTable, getCoreRowModel, ColumnFiltersState, ColumnDef, flexRender } from '@tanstack/react-table'
// import { GroupInterface } from '../../models/group.model';
// import { RowDataType } from '../../submodules/managment/user/context/AssignGroupIdentityContext';
import { useGetGroupsQuery } from '../../features/groupsAPI';
import { group } from 'console';
import useAccountProps from '../../submodules/managment/user/context/useAccountProps';


// interface UserToGroupTableProps {
//     data: RowDataType[];
//     columns: ColumnDef<RowDataType, any>[];
// }
  

// const UserGroupTable = ({data, columns}: UserToGroupTableProps ) => {
//     const [globalFilter, setGlobalFilter] = useState<string | number>('')
//     const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    
//   const userTableInstance = useReactTable({
//     data,
//     columns,
//     state: {
//       globalFilter,
//       columnFilters,
     
//     },
//     enableRowSelection: true,
//     getCoreRowModel: getCoreRowModel(),
//   })
//   return (
//     <div className='group'>
//         <table className="table table-sm table-border table-striped text-left mb-5 text-[14px]">
//             <thead>
//                 {
//                     userTableInstance.getHeaderGroups().map((headerRowElement) => {
//                         return(
//                             <tr id={headerRowElement.id}>
//                                 {
//                                     headerRowElement.headers.map((headerColElement) => {
//                                         return(
//                                             <th key={headerColElement.id}>
//                                                 {
//                                                     headerColElement.isPlaceholder
//                                                     ? null
//                                                     : flexRender(
//                                                         headerColElement.column.columnDef.header,
//                                                         headerColElement.getContext()
//                                                     )
//                                                 }
//                                             </th>
//                                         )
//                                     })
//                                 }
//                             </tr>
//                         )
//                     })
//                 }
//             </thead>
//             {/* table body for user table  */}
//             <tbody>
//                 {
//                     userTableInstance.getRowModel().rows.map((row) => {
//                         return (
//                             <tr key={row.id} >
//                                 {row.getVisibleCells().map((cell) => {
//                                 return (
//                                     <td key={cell.id}>
//                                         {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                                     </td>
//                                 );
//                                 })}
//                             </tr>
//                         );
//                     })
//                 }
//             </tbody>
//         </table>

//     </div>
//   )
// }

const UserGroupTable = () => {

    const {data} = useGetGroupsQuery()
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const {userData, setUserData} = useAccountProps()

    const getAttachedGroup = (id: number): string => {
        const selectedRow = data?.find((group, index) => index === id - 1);
        return selectedRow?.group_name || '';
      };

      const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
        setSelectedRows([id]);
        setUserData?.((prevUserAccount) => ({
          ...prevUserAccount,
          group: getAttachedGroup(id),
        }));
      };

      console.log(userData?.group)
      return (
        <>
          <div className='user-group overflow-y-scroll h-[250px]'>
            <table className='table relative'>
              <thead className='sticky top-0'>
                <tr>
                  <th className='whitespace-nowrap'></th>
                  <th>Posix Id</th>
                  <th>Group Abbreviation</th>
                  <th>Group Name</th>
                </tr>
              </thead>
              <tbody>
                {
                  data?.map((group, index: number) => {
                    const rowId = index + 1; // Adjust the row identifier based on your data structure
                    const isChecked = selectedRows.includes(rowId);
                    return (
                      <tr key={index}>
                        <td className=''>
                          <input
                            type='radio'
                            name='gChecked'
                            className='w-4 h-4'
                            checked={isChecked || userData?.gChecked}
                            onChange={(event) => handleRadioChange(event, rowId)}
                          />
                        </td>
                        <td>{group.group_posix_Id}</td>
                        <td>{group.group_abbreviation}</td>
                        <td>{group.group_name}</td>
                      </tr>
                    );
                })}
              </tbody>
            </table>
          </div>
        </>
      );
}

export default UserGroupTable