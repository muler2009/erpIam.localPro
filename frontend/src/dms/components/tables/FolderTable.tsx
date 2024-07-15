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
import { FolderColumn, FolderDataInterface } from "../../models/folder-models";
import {Search} from "../../../iam/components/common";
import FolderTableHeader from "./FolderTableHeader";
import SubFolderView from "../../views/document-management/folders/SubFolderView";
import useSubFolderColumns from "../../constants/columns/useSubFolderColumns";
import { FlexBox } from "../../../iam/components/reusable/StyledComponent";

interface FolderTableProps {
    data: FolderDataInterface[];
    columns: ColumnDef<FolderColumn, any>[];
}
  

const FolderTable = ({data, columns}: FolderTableProps) => {
    const [globalFilter, setGlobalFilter] = useState<string | number>('')
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [expanded, setExpanded] = useState<ExpandedState>({})
    const [pagination, setPagination] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10
    })
  const folderTableInstance = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      columnFilters,
      pagination,
      expanded
    },
    enableRowSelection: true,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getRowCanExpand: () => true,
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  })

  const { subFolderColumns } = useSubFolderColumns()
//   console.log({selectedRows: userTableInstance.getSelectedRowModel()})

  return (
    <div className="flex flex-col gap-2">
        <div className='flex justify-between space-x-3 items-center mt-4'>
            <Search
                globalFilter={globalFilter}
                setGlobalFilter = {setGlobalFilter}
            /> 
        
          <div className='w-1/3 flex justify-end items-center space-x-3 divide-x-[1px]'>
            {/* <ShowEntries table={userTableInstance} />
            <PaginationController table = {userTableInstance} /> */}
          
          </div>
        </div>
        <div className="folder">
            <table className="table table-sm table-border table-striped text-left mb-5 text-[14px]">
                <thead>
                    {
                        folderTableInstance.getHeaderGroups().map((headerRowElement) => {
                            return(
                                <tr id={headerRowElement.id}>
                                    {
                                        headerRowElement.headers.map((headerColElement) => {
                                            return <FolderTableHeader folderColRow={headerColElement} />
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </thead>
                {/* table body for user table  */}
                <tbody className="">
                    {
                        folderTableInstance.getRowModel().rows.map((row) => {
                            return (
                            <React.Fragment key={row.id}>
                                <tr key={row.id} >
                                    {row.getVisibleCells().map((cell) => {
                                    return (
                                        <td key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    );
                                    })}
                                </tr>
                                
                                {
                                    row.getIsExpanded() && (
                                        <tr>
                                            <td className="custom-td relative" colSpan={row.getVisibleCells().length}>
                                                {
                                                    row.original.subfolder?.length
                                                    ? (
                                                        <div className=" pl-5 before:content-[''] before:absolute before:w-[1px] before:bg-[#ccc] before:h-full">
                                                            <SubFolderView subfolder={row.original.subfolder} columns={subFolderColumns}  />
                                                        </div>
                                                    ): (
                                                        <FlexBox className="">No folder to show</FlexBox>
                                                    )
                                                }
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
  )
}

export default FolderTable