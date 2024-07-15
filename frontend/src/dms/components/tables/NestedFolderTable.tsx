import React from 'react'
import {ColumnDef, getCoreRowModel, useReactTable, flexRender} from '@tanstack/react-table'
import { FolderColumn, FolderDataInterface } from '../../models/folder-models';


interface NestedUserTableProps {
    data: FolderDataInterface[],
    columns: ColumnDef<FolderColumn, any>[];
}

const NestedFolderTable = ({columns, data}: NestedUserTableProps ) => {
    const nestedFolderTableInstance = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),        
    })
  return (
    <div className='subfolder'>

        <table className="table table-sm text-left mb-5 text-[14px]">
        {/* <thead>
            {
                nestedFolderTableInstance.getHeaderGroups().map((headerRowElement) => {
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
        </thead> */}
        {/* table body for user table  */}
        <tbody>
            {
                nestedFolderTableInstance.getRowModel().rows.map((row) => {
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

export default NestedFolderTable