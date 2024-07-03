import { useContext, useState } from "react"
import {
    getCoreRowModel, 
    useReactTable, 
    flexRender, 
    ColumnDef, 
    getFilteredRowModel, 
    getSortedRowModel, 
    ColumnFiltersState,
    getPaginationRowModel,
    PaginationState
} from '@tanstack/react-table'

import { useTableContext } from "./TableContext"
import { UserAccountInterfacee, UserCoulumn } from "../../models/user.model";
import {Search, ShowEntries, PaginationController, FilterBy} from "../common";
import UserTableHeader from "./UserTableHeader";
import { table } from "console";


interface Data {
    data: string;
}

interface UserTableProps {
    data: UserAccountInterfacee[];
    columns: ColumnDef<UserCoulumn, any>[];
}
  

const UserTable = ({data, columns}: UserTableProps) => {
    const [globalFilter, setGlobalFilter] = useState<string | number>('')
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [pagination, setPagination] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: 5
    })
  const userTableInstance = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      columnFilters,
      pagination
    },
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  })


  console.log({selectedRows: userTableInstance.getSelectedRowModel()})

  return (
    <div className="flex flex-col gap-2">
        <div className='flex justify-between space-x-3 items-center mt-4'>
          <div className='flex-grow'>
            <Search
                globalFilter={globalFilter}
                setGlobalFilter = {setGlobalFilter}
            /> 
          </div>
          <div className='w-1/3 flex justify-end items-center space-x-3 divide-x-[1px]'>
            <ShowEntries table={userTableInstance} />
            <PaginationController table = {userTableInstance} />
            <FilterBy 
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
            />
          </div>
        </div>
        <div className="user">
            <table className="table table-sm table-border table-striped text-left mb-5 text-[14px]">
                <thead>
                    {
                        userTableInstance.getHeaderGroups().map((headerRowElement) => {
                            return(
                                <tr id={headerRowElement.id}>
                                    {
                                        headerRowElement.headers.map((headerColElement) => {
                                            return <UserTableHeader headerColElement={headerColElement} />
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
                        userTableInstance.getRowModel().rows.map((row) => {
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
    </div>
  )
}

export default UserTable