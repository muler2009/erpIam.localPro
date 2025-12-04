import React, { useState } from 'react'
import { Header, flexRender } from '@tanstack/react-table'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import * as MiIcons from "react-icons/md";
import * as LuIcons from "react-icons/lu";
import { FolderColumn } from '../../models/folder-models';

interface FolderHeaderInterface {
    folderColRow: Header<FolderColumn, unknown>
}

const FolderTableHeader = ({folderColRow}: FolderHeaderInterface) => {

    const isGroupSorted = folderColRow.column.getIsSorted()
    const [open, setOpen] = useState(false)

  return (

    <th 
        id={folderColRow.id} 
        className={`relative`}>
            {" "}
            <div className='flex space-x-1 justify-start items-center'>
                <>
                    {
                        folderColRow.isPlaceholder
                        ? null
                        : flexRender(
                                folderColRow.column.columnDef.header,
                                folderColRow.getContext()
                    )}

                    <div className='relative'>
                        {isGroupSorted && <div className='flex px-1'>
                            {isGroupSorted === "desc" && (LuIcons.LuArrowUpWideNarrow({size:20})) }
                            {isGroupSorted === "asc" &&  (LuIcons.LuArrowDownWideNarrow({size:20})) }

                        </div>}
                    </div>
                </>

                <div className='menu pl-2' onClick={() => setOpen(prev => !prev)}>
                {
                  MiIcons.MdOutlineKeyboardArrowDown({})
                }
                <div className='relative w-[10%] top-1'>
                  {
                    open && (
                      <div className='absolute bg-white w-[150px] z-10 border py-2 px-3 rounded-[5px] hover:bg-sky-50 -left-0'>
                        <h1 onClick={folderColRow.column.getToggleSortingHandler()}>
                          {isGroupSorted === "desc" ? "Asc" : "Desc" }
                        </h1>
                      </div>
                    )
                  }

                </div>
            </div>

            </div>
        
    </th>
  )
}

export default FolderTableHeader