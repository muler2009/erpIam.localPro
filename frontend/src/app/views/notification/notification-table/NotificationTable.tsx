import React, { useState } from "react"
import { FlexBox, FlexBoxInner } from "../../../../components/common/StyledComponent";
import { useGetNotificationQuery } from "../../../services/notificationAPISlice";

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


interface SharedTableProps<T> {
    data: T[];
    columns: ColumnDef<T, any>[];
    watermark?: string;
    showEntries?: boolean;
    showSearch?: boolean;
    showActions?: boolean; 
  }
  
const NotificationTable= <T,>({data, columns, watermark, showEntries = true, showSearch = true, showActions= false}: SharedTableProps<T>) => {
   
    const {data: notificationData} = useGetNotificationQuery()
    const notification = notificationData?.[4]?.notification_read ;

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
      

        <FlexBoxInner className="shadow-sm">
            <table className="table table-sm table-striped table-border text-left mb-5 text-[14px] relative">
                {/* <thead className="font-Poppins font-semibold z-40">
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
                </thead> */}
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
                                <tr key={row.id} className={`hover:bg-gray-100 group ${notification ? 'bg-white' : 'bg-sky-100'}`} >
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
    </FlexBox>


  )
}

export default NotificationTable