import React, { useState } from "react"
import {
    getCoreRowModel, 
    useReactTable, 
    flexRender, 
    ColumnDef, 
    getFilteredRowModel, 
    getSortedRowModel, 
    ColumnFiltersState,
    getPaginationRowModel,
    PaginationState,
    ExpandedState,
    getExpandedRowModel
} from '@tanstack/react-table'
import { Search, ShowEntries, PaginationController, FilterBy } from "../common";
import { Div,  FlexBox, FlexBoxInner  } from "../../../components/common/StyledComponent";
import usePolicyColumn from "../../views/managment/constants/columns/usePolicyColumn";

interface SharedTableProps<T> {
    data: T[];
    columns: ColumnDef<T, any>[];
    watermark?: string;
    showEntries?: boolean;
    showSearch?: boolean;
    showActions?: boolean; 
  }
  
const PolicyTable= <T,>({data, columns, watermark, showEntries = true, showSearch = true, showActions= false}: SharedTableProps<T>) => {
   
    const [globalFilter, setGlobalFilter] = useState<string | number>('')
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [expanded, setExpanded] = useState<ExpandedState>({})
    const [pagination, setPagination] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10
    })
  const sharedTableInstance = useReactTable({
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

  return (

    <FlexBox className="flex flex-col gap-2 h-full">
        <FlexBoxInner className='flex justify-between space-x-3 items-center'>
            {
                showEntries && (<ShowEntries table={sharedTableInstance} />)
            }
            {
                showSearch && 
                    (
                        <Div className='flex-grow'>
                            <Search
                                globalFilter={globalFilter}
                                setGlobalFilter = {setGlobalFilter}
                            /> 
                        </Div>
                    )
            }
        </FlexBoxInner>

        <FlexBoxInner className="shadow-sm">
            <table className="table table-sm table-border text-left mb-5 text-[14px] relative">
                <thead className="font-Poppins font-semibold z-40">
                    {
                        sharedTableInstance.getHeaderGroups().map((headerRowElement) => {
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
                        watermark && (
                            <tr className="watermark">
                                <div className="opacity-3 text-5xl pt-10 font-bold stamp">
                                    {watermark}
                                </div>
                            </tr>
                        )
                    }  

                    {
                    
                        sharedTableInstance.getRowModel().rows.map((row) => {
                            return (
                            <React.Fragment key={row.id}>
                                <tr key={row.id} className="hover:bg-gray-100 group" >
                                    {row.getVisibleCells().map((cell) => {
                                    return (
                                        <td key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    );
                                    })}
                                </tr>
                            </React.Fragment>
                            );
                        })
                        
                    }
                </tbody>
            </table>
        </FlexBoxInner>
        <FlexBox className='flex justify-center items-center space-x-3 z-10'>
            <PaginationController table = {sharedTableInstance} />          
        </FlexBox>
    </FlexBox>


  )
}

export default PolicyTable