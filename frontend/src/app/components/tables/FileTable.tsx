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
import { FolderColumn, FolderDataInterface, UploadedDocumentInterface } from "../../models/folder-models";
import {Search} from "../../../iam/components/common";
import FolderTableHeader from "./FolderTableHeader";
import SubFolderView from "../../views/document-management/folders/SubFolderView";
import useSubFolderColumns from "../../constants/columns/useSubFolderColumns";
import { FlexBox, FlexBoxInner, Text, P } from "../../../iam/components/reusable/StyledComponent";
import { FaFilePdf } from "react-icons/fa";
import { AiFillEye } from "react-icons/ai";
import { format } from "date-fns";
import { BsCardList } from "react-icons/bs";
import { TfiLayoutGrid2Alt } from "react-icons/tfi";
import { BsFileEarmark } from "react-icons/bs";
import { GiOpenFolder } from "react-icons/gi";
import useSharedColumns, { SharedColumn } from "../../constants/columns/useSharedColumns";
import { FileUploadColumnInterface } from "../../models/document-models.";

interface SharedTableProps {
    data: UploadedDocumentInterface[];
    columns: ColumnDef<FileUploadColumnInterface, any>[];
}
  
const FileTable = ({data, columns}: SharedTableProps) => {
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
    // getSubRows: (row) => row.subfolder,
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

 const sharedColumn = useSharedColumns()

  return (
    <div className="flex flex-col gap-1 h-full">      
        <div className="file">
            <table className="table table-sm table-border text-left mb-5 text-[14px]">
                <thead className="font-Poppins font-semibold">
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
                <tbody className="">
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
        </div>
    </div>
  )
}

export default FileTable