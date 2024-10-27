import React, {useState} from 'react'
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
import { FolderColumn, FolderDataInterface } from '../../models/folder-models';
import { FlexBox, FlexBoxInner, Text, P } from '../../../components/common/StyledComponent';
import SubFolderView from '../../views/document-management/folders/SubFolderView';
import useSubFolderColumns from '../../constants/columns/useSubFolderColumns';
import { format } from 'date-fns';
import { FaFilePdf } from 'react-icons/fa';
import { AiFillEye } from 'react-icons/ai';


interface NestedUserTableProps {
    data: FolderDataInterface[],
    columns: ColumnDef<FolderColumn, any>[];
}

const NestedFolderTable = ({columns, data}: NestedUserTableProps ) => {
    const {subFolderColumns} = useSubFolderColumns()
    const [expanded, setExpanded] = useState<ExpandedState>({})
    const nestedFolderTableInstance = useReactTable({
        data,
        columns,
        state: {
            expanded
          },
        getCoreRowModel: getCoreRowModel(),     
        onExpandedChange: setExpanded,
        getRowCanExpand: () => true,
        getExpandedRowModel: getExpandedRowModel(),
        getFilteredRowModel: getFilteredRowModel()   
    })
  return (
    <div className='subfolder'>

        <table className="table table-sm text-left mb-5 text-[14px]">
        {/* <thead>
            {
                nestedFolderTableInstance.getHeaderGroups().map((headerRowElement) => {
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
                nestedFolderTableInstance.getRowModel().rows.map((row) => {
                    return (
                        <React.Fragment key={row.id}>

                            <tr >
                                {row.getVisibleCells().map((cell) => {
                                return (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                );
                                })}
                            </tr>
                            {/* {
                                    row.getIsExpanded() && (
                                        <tr>
                                            <td className="custom-td relative" colSpan={row.getVisibleCells().length}>
                                                {
                                                    row.original.subfolder?.length || row.original.uploaded_file?.length
                                                    ? (
                                                        <FlexBox className=" pl-5 before:content-[''] before:absolute before:w-[1px] before:bg-[#ccc] before:h-full flex flex-col">
                                                           
                                                            <div>
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
                                    )
                                } */}
                        </React.Fragment>
                    );
                })
            }
        </tbody>

    </table>
    </div>
  )
}

export default NestedFolderTable