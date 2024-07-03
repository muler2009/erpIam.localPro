import {getCoreRowModel, useReactTable, flexRender, ColumnDef,  getFilteredRowModel} from '@tanstack/react-table'
import { useState } from 'react';
import Filters from './Search';
import Search from './Search';


interface TableProps {
  columns: any[];
  data: any[] ;
  actions?: (hooks: any) => ColumnDef<any>[]
}

const RoleTableStructure = ({columns, data, actions}: TableProps) => {
  const [globalFilter, setGlobalFilter] = useState<string | number>('')

    const table = useReactTable({
        data,
        columns,
        state: {
          globalFilter
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setGlobalFilter,
      },      
    )  
    return (
      <div className='flex flex-col gap-5 w-[75%]'>
        <Search 
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        {/* <Filters /> */}
        <div className='role'>
          <table className={`table table-sm table-border table-striped text-left mb-5 text-[14px] `}>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => {
                return (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <th id={header.id}>
                          {" "}
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      );
                    })}
                  </tr>
                );
              })}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => {
                return (
                  <tr key={row.id}>
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
  
  

export default RoleTableStructure
