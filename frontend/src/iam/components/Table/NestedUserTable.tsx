import React from 'react'
import { UserAccountInterfacee, UserCoulumn } from '../../models/user.model'
import {ColumnDef, getCoreRowModel, useReactTable, flexRender} from '@tanstack/react-table'


interface NestedUserTableProps {
    data: UserAccountInterfacee[],
    columns: ColumnDef<UserCoulumn, any>[];
}

const NestedUserTable = ({columns, data}: NestedUserTableProps ) => {
    const nestedTableInstance = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        // initialState: {
        //     columnVisibility: {
        //         userId: false,
        //         email: false, //hide this column by default
        //         username: false,
        //       },
        // }
        
    })
  return (
    <div className='nested-group'>

        <table className="table table-sm table-border table-striped text-left mb-5 text-[14px]">
        <thead>
            {
                nestedTableInstance.getHeaderGroups().map((headerRowElement) => {
                    return(
                        <tr id={headerRowElement.id}>
                            {
                                headerRowElement.headers.map((headerColElement) => {
                                    return (
                                        <th id={headerColElement.id}>
                                            {
                                                headerColElement.isPlaceholder
                                                ? null 
                                                : flexRender(
                                                    headerColElement.column.columnDef.header,
                                                    headerColElement.getContext()
                                                )
                                            }
                                        </th>
                                    )
                                })
                            }
                        </tr>
                    )
                })
            }
        </thead>
        {/* table body for user table  */}
        <tbody>
            {
                nestedTableInstance.getRowModel().rows.map((row) => {
                    return (
                        <tr key={row.id} >
                            {row.getVisibleCells().map((cell) => {
                            return (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            );
                            })}
                        </tr>
                    );
                })
            }
        </tbody>

    </table>
    </div>
  )
}

export default NestedUserTable