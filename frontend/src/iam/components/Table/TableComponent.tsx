import React, {useState, useCallback, useMemo} from 'react'
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
} from '@tanstack/react-table'

import { FlexBox, FlexBoxInner, } from '../reusable/StyledComponent'
import { SharedTableProps, BaseRecord } from '../../models/table-interface'
import { ShowEntries, Search, PaginationController } from '../common'




const TableComponent = <T extends BaseRecord>({data, columns, showSearch, showEntries, showPagination, showFilter, showFooter, filter_title, tableStyle}: SharedTableProps<T>) => {
    const [globalFilter, setGlobalFilter] = useState<string | number>('')
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [expanded, setExpanded] = useState<ExpandedState>({})
    const [pagination, setPagination] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10
    })

    const handleMonthChange = (month: string) => {
        // Update the column filters based on the selected month
        setColumnFilters([
          {
            id: "record_date", // Use the "record_date" column for filtering
            value: month, // Pass the selected month as the filter value
          },
        ]);
      };

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
            { showEntries && (<ShowEntries table={sharedTableInstance} />) }
            {
                showSearch && 
                    (
                        <div className='flex-grow'>
                            <Search
                                globalFilter={globalFilter}
                                setGlobalFilter = {setGlobalFilter}
                            /> 
                        </div>
                    )
            }
            { showPagination && ( <PaginationController table={sharedTableInstance} /> ) }  
        </FlexBoxInner>
        <FlexBoxInner className={`mx-1 ${tableStyle}`}>
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
                {
                   showFooter && (
                        <tfoot>
                            {sharedTableInstance.getFooterGroups().map((footerGroup) => (
                            <tr key={footerGroup.id} className='pl-5'>
                                {footerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {flexRender(header.column.columnDef.footer, header.getContext())}
                                </th>
                                ))}
                            </tr>
                            ))}
                        </tfoot>
                   ) 
                }
            </table>
        </FlexBoxInner>
    </FlexBox>
  )
}

export default TableComponent
