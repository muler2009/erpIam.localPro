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
import { FlexBox, FlexBoxInner, Text, P } from "../../../iam/components/reusable/StyledComponent";
import { FaFilePdf } from "react-icons/fa";
import { AiFillEye } from "react-icons/ai";
import { format } from "date-fns";


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
                                                    row.original.subfolder?.length || row.original.uploaded_file?.length
                                                    ? (
                                                        <FlexBox className=" pl-5 before:content-[''] before:absolute before:w-[1px] before:bg-[#ccc] before:h-full flex flex-col">
                                                           
                                                            <div className="">
                                                                <SubFolderView subfolder={row.original.subfolder} columns={subFolderColumns}  />
                                                            </div>
                                                            <FlexBoxInner className="pl-5">
                                                                {
                                                                    row.original.uploaded_file?.length && (
                                                                        row.original.uploaded_file?.map((file, index) => {
                                                                            const date = format(file.uploaded_file_date || 0, 'EEE dd yyyy')
                                                                            return(
                                                                                <FlexBox key={index} className="flex justify-between items-center bg-white py-2 left-10">
                                                                                    <FlexBoxInner className="flex items-center justify-between w-2/3">
                                                                                        <aside className="pr-4 flex items-center">
                                                                                            <FaFilePdf />
                                                                                            <span className="pl-4">
                                                                                                {file.uploaded_document_name}
                                                                                            </span>
                                                                                        </aside>
                                                                                       
                                                                                        <Text>{date}</Text>
                                                                                        <Text className="">PDF file</Text>
                                                                                        <Text> {date}</Text>
                                                                                    </FlexBoxInner>
                                                                                    <FlexBoxInner className="pr-20 flex space-x-1 items-center" onClick={() => alert(`clicked ${file.file_url}`)}>
                                                                                        <AiFillEye /><span className="">View</span>
                                                                                    </FlexBoxInner>
                                                                                </FlexBox>

                                                                            )
                                                                        }
                                                                        )
                                                                    )
                                                                }

                                                            </FlexBoxInner>
                                                
                                                        </FlexBox>
                                                    ): (
                                                        <FlexBox className="">No Empty</FlexBox>
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