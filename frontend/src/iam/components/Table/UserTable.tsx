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
import { FlexBox, FlexBoxInner } from "../reusable/StyledComponent";
import UserActionDropDownComponent from "../../views/managment/user/views/user-mini-components/UserActionDropDownComponent";
import { Div } from "../../../components/common/StyledComponent";
import { ModalContextProvider } from "../reusable/custom-modal/context/ModalContext";

interface UserTableProps {
    data: UserAccountInterfacee[];
    columns: ColumnDef<UserCoulumn, any>[];
}
  

const UserTable = ({data, columns}: UserTableProps) => {
    const [globalFilter, setGlobalFilter] = useState<string | number>('')
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [pagination, setPagination] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10
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
    
        <FlexBox className="flex flex-col h-full space-y-2">
            <FlexBoxInner className='flex justify-between space-x-3 items-center bg-gradient-to-b from-white to-gray-300 rounded-sm'>
            <FlexBox className='flex-grow'>
                <Search
                    globalFilter={globalFilter}
                    setGlobalFilter = {setGlobalFilter}
                /> 
            </FlexBox>
            <FlexBox className='w-1/3 flex justify-between items-center space-x-3 z-10'>
                <ShowEntries table={userTableInstance} />
                <PaginationController table = {userTableInstance} />
            <Div className="" />
            </FlexBox>
            </FlexBoxInner>
            <FlexBoxInner className="user mx-2">
                <table className="table table-sm table-border table-striped text-left text-[14px]">
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
                                    <tr key={row.id} className="group" >
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
            </FlexBoxInner>
        </FlexBox>
   
  )
}

export default UserTable