import React, {useMemo, useState} from 'react'
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
import Search from './Search';
import * as TbIcons from "react-icons/tb";
import FilterBy from './FilterBy';
import { FilterType } from '../interface/Search.Interface';
import PaginationController from './PaginationController';
import ShowEntries from './ShowEntries';


interface TableProps {
    columns: any[];
    data: any[] ;
}

const UserTableStructure = ({columns, data}: TableProps) => {
    const [globalFilter, setGlobalFilter] = useState<string | number>('')
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [pagination, setPagination] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: 5
    })

    const table = useReactTable({
        data,
        columns,
        state: {
          globalFilter,
          columnFilters,
          pagination
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilters,
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        
      },      
    )  

    console.log(columnFilters)

    return (
      <div className='flex flex-col gap-5'>
        <div className='flex justify-between space-x-3 items-center mt-4'>
          <div className='flex-grow'>
            <Search
                globalFilter={globalFilter}
                setGlobalFilter = {setGlobalFilter}
            /> 
          </div>
          <div className='w-1/3 flex justify-end items-center space-x-3 divide-x-[1px]'>
            <ShowEntries table={table} />
            <PaginationController table = {table} />
            <FilterBy 
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
            />
          </div>
        </div>
        <div className='user'>
          <table className={`table table-sm table-border text-left mb-5 text-[14px] `}>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => {
                return (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header, index) => {
                      return (
                        <th key={index}>
                          {" "}
                          <div className='flex items-center px-2'>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                                <span className='ml-2'>
                                    {header.column.getCanSort() && <TbIcons.TbArrowsSort onClick={header.column.getToggleSortingHandler()}/>                                     }
                                </span>

                          </div>
                        </th>
                      );
                    })}
                  </tr>
                );
              })}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row, index) => {
                return (
                  <tr key={index}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default UserTableStructure
