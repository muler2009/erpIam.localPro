import {
  getCoreRowModel, 
  useReactTable, 
  flexRender, 
  ExpandedState, 
  getFilteredRowModel, 
  getExpandedRowModel, 
  RowSelectionState
} from '@tanstack/react-table'
import { useState } from 'react';
import Search from '../common/Search';
import useUserAccount from '../../hooks/useUserAccount';
import useCreateUserAccount from '../../submodules/managment/user/context/useCreateUserAccount';
import GroupTableHeader from './GroupTableHeader';
import useGroupColumn from '../../submodules/managment/constants/columns/useGroupColumn';
import RowDetailedView from './RowDetailedView';
import useUserColumn from '../../submodules/managment/constants/columns/useUserColumn';
import { NESTED_COL } from '../../submodules/managment/constants/columns/useUserColumn';
import React from 'react';
interface TableProps {
  columns: any[];
  data: any[] ;
  
}


const GroupTable = ({columns, data}: TableProps) => {
  const [globalFilter, setGlobalFilter] = useState<string | number>('')
  const [expanded, setExpanded] = useState<ExpandedState>({})
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({}) 

  const {userColumns } = useUserColumn()
    
  const groupTableInstance = useReactTable({
        data,
        columns: columns,
        state: {
          globalFilter,
          expanded,
          
        },
        
        enableRowSelection: true,
        onExpandedChange: setExpanded,
        getCoreRowModel: getCoreRowModel(),
        getRowCanExpand: () => true,
        getExpandedRowModel: getExpandedRowModel(),
        getFilteredRowModel: getFilteredRowModel()
      },      
    )  

    return (
      <div className='flex flex-col gap-5'>
        <Search 
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        {/* <Filters /> */}
        <div className='group'>
          <table className={`table table-sm table-border table-striped text-left mb-5 text-[14px] `}>
            <thead>
              {
                groupTableInstance.getHeaderGroups().map((headerGroup) =>
                 {
                  return (
                    <tr key={headerGroup.id}>
                      {
                        headerGroup.headers.map((groupColRow) => {
                          return <GroupTableHeader groupColRow ={groupColRow} />
                        })
                      }
                    </tr>
                  );
                })
              }
            </thead>
            <tbody>
              {
                groupTableInstance.getRowModel().rows.map((row) => {
                  return (
                    <React.Fragment key={row.id}>
                      <tr className={`${row.getIsExpanded() && 'bg-white'}`}>
                        {row.getVisibleCells().map((cell) => {
                          return (
                            <td key={cell.id}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                          );
                        })}
                      </tr>
                  
                      {row.getIsExpanded() && (
                          <tr>
                            <td className="custom-td" colSpan={row.getVisibleCells().length}>
                              <RowDetailedView members={row.original.members} columns={NESTED_COL}  />
                            </td>
                          </tr>
                        )}
                    </React.Fragment>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  
  

export default GroupTable
